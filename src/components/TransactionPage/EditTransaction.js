import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBCheckbox, MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";
import "./CreateTransaction.css";
import {MDBCardText} from "mdbreact";
import {Input, Select, useToast} from "@chakra-ui/react";
import {FaRegCalendarAlt} from "react-icons/fa";
import {BsWallet} from "react-icons/bs";
import {MdOutlineAttachMoney} from "react-icons/md";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useChangeNotification} from "../../ChangeNotificationContext";
const EditTransaction = () => {

    const { notifyTransactionChange } = useChangeNotification();
    const toast = useToast();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))
    const transaction_edit = JSON.parse(localStorage.getItem("transaction_edit"));
    const [transaction, setTransaction] = useState({
        amount: "",
        note: "",
        transactionDate: "",
        endDate: "",
        lender: "",
        borrower: "",
        wallet_id: "",
        category_id: ""
    });

    const [categories, setCategories] = useState([]);
    const [wallets, setWallets] = useState([])
    const [select_category, setCategory] = useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleChange = (e) => {
        console.log(e)
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const transactionData = {
            amount: parseInt(transaction.amount),
            note: transaction.note,
            transactionDate: transaction.transactionDate,
            endDate: transaction.endDate,
            lender: transaction.lender,
            borrower: transaction.borrower,
            wallet_id: parseInt(transaction.wallet_id),
            category_id: parseInt(transaction.category_id)
        };
        if (select_category === "EXPENSE" || select_category === "INCOME") {
            console.log(transactionData)
            axios.put(`http://localhost:8080/api/transactions/user/${user.id}/expense_income/${transaction_edit.id}`, transactionData)
                .then(res => {
                    notifyTransactionChange();
                    console.log(res);
                    toast({
                        title: 'Edit success!',
                        description: 'You successfully created a transaction!',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                    });
                    navigate("/auth/transactions");

                })
                .catch(err => {
                    console.error(err);
                    toast({
                        title: 'Edit Failed',
                        description: 'Failed to create a transaction!',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                });
        }
        if (select_category === "DEBT" || select_category === "LOAN") {
            console.log(transactionData)
            axios.put(`http://localhost:8080/api/transactions/user/${user.id}/debt_loan/${transaction_edit.id}`, transactionData)
                .then(res => {
                    notifyTransactionChange();
                    console.log(res);
                    toast({
                        title: 'Edit success!',
                        description: 'You successfully created a transaction!',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                    });
                    navigate("/auth/transactions");

                })
                .catch(err => {
                    console.error(err);
                    toast({
                        title: 'Edit Failed',
                        description: 'Failed to create a transaction!',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                // Gọi API để lấy danh sách ví
                const wallets_data = await axios.get('http://localhost:8080/api/wallets/user/' + user.id);
                setWallets(wallets_data.data);

                // Gọi API để lấy danh sách category
                const categories_data = await axios.get('http://localhost:8080/api/categories/user/' + user.id);
                setCategories(categories_data.data);
                setTransaction({
                    amount: parseInt(transaction_edit.amount),
                    note: transaction_edit.note,
                    transactionDate: transaction_edit.transactionDate,
                    endDate: transaction_edit.endDate,
                    lender: transaction_edit.lender,
                    borrower: transaction_edit.borrower,
                    wallet_id: parseInt(transaction_edit.wallet.id),
                    category_id: parseInt(transaction_edit.category.id)
                })
                setCategory(transaction_edit.category.type)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user.id]);

    return (
        <div>
            <div className="form-body">
                <form onSubmit={handleSubmit}>
                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol className="mb-4" sm="1" style={{
                                    fontSize: "35px",
                                    color: select_category === 'INCOME' || select_category === 'DEBT' ? "blue" : "red"
                                }}>
                                    <MdOutlineAttachMoney/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput id='form6Example1' label='Money number' sm="11" name='amount'
                                              value={transaction.amount} onChange={handleChange}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBCardText className="text-muted">Category</MDBCardText>
                            <Select name='category_type' className="form-select" aria-label="Default select example"
                                    value={select_category} onChange={handleCategoryChange}>
                                <option value='all'>---Select category---</option>
                                <option value='INCOME'>INCOME</option>
                                <option value='EXPENSE'>EXPENSE</option>
                                <option value='DEBT'>DEBT</option>
                                <option value='LOAN'>LOAN</option>
                            </Select>
                            {
                                select_category !== 'all' && (
                                    <>
                                        <MDBCardText className="text-muted">Sub Category</MDBCardText>
                                        <Select name='category_id' className="form-select"
                                                aria-label="Default select example" onChange={handleChange}>
                                            <option>Select category</option>
                                            {categories.filter(category => category.type === select_category) // Lọc danh sách chỉ giữ lại các danh mục có type là "INCOME"
                                                .map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        <img src={category.image} alt={"image"}/>
                                                        <span>{category.name}</span>
                                                    </option>
                                                ))}
                                        </Select>
                                    </>
                                )
                            }

                            {select_category !== 'EXPENSE' && select_category !== 'INCOME' && select_category !== 'LOAN' && select_category !== 'all' && (
                                <MDBInput onChange={handleChange} wrapperClass='mb-4' id='form6Example3' label='Lender' value={transaction.lender}
                                          name='lender'/>
                            )}
                            {select_category !== 'EXPENSE' && select_category !== 'INCOME' && select_category !== 'DEBT' && select_category !== 'all' && (
                                <MDBInput onChange={handleChange} wrapperClass='mb-4' id='form6Example4' value={transaction.borrower}
                                          label='Borrower' name='borrower'/>
                            )}
                            {
                                select_category !== 'all' && (
                                    <>
                                        <MDBInput onChange={handleChange} name="note" wrapperClass='mb-4' textarea value={transaction.note}
                                                  id='form6Example7' rows={4} label='Note' style={{height: "100px"}}/>
                                    </>
                                )
                            }
                        </MDBCol>
                        <MDBCol>
                            {
                                select_category !== 'all' && (
                                    <>
                                        <MDBCardText className="text-muted">Start Date</MDBCardText>
                                        <MDBRow>
                                            <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt/></MDBCol>
                                            <MDBCol sm="10"><Input required type={'date'} name='transactionDate'
                                                                   value={transaction.transactionDate}
                                                                   onChange={handleChange}></Input></MDBCol>
                                        </MDBRow>
                                    </>
                                )
                            }

                            {select_category !== 'EXPENSE' && select_category !== 'INCOME' && select_category !== 'all' && (
                                <>
                                    <MDBCardText className="text-muted">End Date</MDBCardText>
                                    <MDBRow>
                                        <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt/></MDBCol>
                                        <MDBCol sm="10"><Input required type={'date'} name='endDate'
                                                               value={transaction.endDate}
                                                               onChange={handleChange}></Input></MDBCol>
                                    </MDBRow>
                                </>
                            )}
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            {select_category !== 'all' && (
                                <>
                                    <MDBCardText className="text-muted">Wallets</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "30px"}}><BsWallet/></MDBCol>
                                        <MDBCol sm="10">
                                            <div className='relative'>
                                                <Select name='wallet_id' className="form-select"
                                                        aria-label="Default select example" onChange={handleChange}>
                                                    <option>Select wallet</option>
                                                    {wallets.map((wallet) => (
                                                        <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </>
                            )}
                        </MDBCol>
                        {
                            select_category !== 'all' && (
                                <MDBCol className="btn_submit">
                                    <MDBBtn type="submit" className='me-1' color='success'>
                                        Submit
                                    </MDBBtn>
                                </MDBCol>
                            )
                        }
                    </MDBRow>
                </form>
            </div>
        </div>
    );
};

export default EditTransaction;