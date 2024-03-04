import React, {useEffect, useState} from 'react';
import {
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBContainer,
    MDBInputGroup,
    MDBInput,
    MDBCheckbox,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdb-react-ui-kit';
import {
    MDBNavbarBrand,
    MDBNavbar,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import {MDBCardText, MDBIcon, MDBListGroupItem} from "mdbreact";
import {MdOutlineAttachMoney, MdOutlineNotes} from "react-icons/md";
import {Input, Select} from "@chakra-ui/react";
import axios from "axios";
import {FaRegCalendarAlt} from "react-icons/fa";
import {BsWallet} from "react-icons/bs";
import {FaMoneyBillTransfer} from "react-icons/fa6";
import {useToast} from "@chakra-ui/react";
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";




export default function Transactions() {

    // gia lap du lieu
    const transactionz = [
        {
            amount: "",
            note: "",
            transactionDate: "",
            endDate: "",
            lender: "",
            borrower: "",
            wallet_id: "",
            category_id: ""
        },
        {
            amount: "",
            note: "",
            transactionDate: "",
            endDate: "",
            lender: "",
            borrower: "",
            wallet_id: "",
            category_id: ""
        }
    ];



    const toast = useToast()

    const navigate = useNavigate();
// ------ Popup Delete --------
        const [selectedId, setSelectedId] = useState(null);
        const [modalDelete, setModalDelete] = useState(false);
        const  openDelete= (id) => {
            setSelectedId(id);
            console.log(selectedId)
            setModalDelete(!modalDelete)
        };

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sủa?');
        if (confirm) {
            axios.delete(`http://localhost:8080/api/transactions/user/${user.id}/transaction/${id}`)
                .then(res => {
                    toast({
                        title: 'Create success!',
                        description: 'You successfully deleted a transaction!',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                    });
                    navigate("/auth/wallets");

                })
                .catch(err => console.log(err))
        }
    }



// ----- Select show form category Transactions ------
        // ---- INCOME ----
        const [modalAddTransactionIncome, setModalAddTransactionIncome] = useState(false);
        const openAddTransactionIncome = () => setModalAddTransactionIncome(!modalAddTransactionIncome);

        // ---- EXPENSE ----
        const [modalAddTransactionExpense, setModalAddTransactionExpense] = useState(false);
        const openAddTransactionExpense = () => setModalAddTransactionExpense(!modalAddTransactionExpense);

        // ---- DEBT ----
        const [modalAddTransactionDebt, setModalAddTransactionDebt] = useState(false);
        const openAddTransactionDebt = () => setModalAddTransactionDebt(!modalAddTransactionDebt);

        // ---- LOAN ----
        const [modalAddTransactionLoan, setModalAddTransactionLoan] = useState(false);
        const openAddTransactionLoan = () => setModalAddTransactionLoan(!modalAddTransactionLoan);

// --------- Get list Transaction -----------

        const [transactions, setTransactions] = useState([])
        const [categories, setCategories] = useState([]);
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

        const [user, setUser] = useState([]);
        const [wallets, setWallets] = useState([])
        const [wallet, setWallet] = useState({
            name: "",
            balance: ""
        })


    const handleChange = (e) => {
        console.log(e)
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit_Debt_Loan = (event) => {
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
        console.log(transactionData)
        axios.post(`http://localhost:8080/api/transactions/user/${user.id}/expense_income`, transactionData)
            .then(res => {
                console.log(res);
                toast({
                    title: 'Create success!',
                    description: 'You successfully created a transaction!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
                navigate("/auth/wallets");

            })
            .catch(err => {
                console.error(err);
                toast({
                    title: 'Create Failed',
                    description: 'Failed to create a wallet!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };




    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy thông tin người dùng từ localStorage
                const userdata = JSON.parse(localStorage.getItem("user"));
                setUser(userdata);

                const wallets = JSON.parse(localStorage.getItem("wallets"));
                setWallets(wallets);

                // Gọi API để lấy danh sách giao dịch
                const transactionResponse = await axios.get('http://localhost:8080/api/transactions/user/' + userdata.id);
                const transactionsData = transactionResponse.data;

                window.localStorage.setItem("transactions", JSON.stringify(transactionsData));
                setTransactions(transactionsData);

                const categories_data = JSON.parse(window.localStorage.getItem("categories"));
                setCategories(categories_data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [transaction]);



    return (
        <div style={{width: "1200px", margin: "auto", marginTop: "50px"}}>


{/*--------  Menu Add Transactions -----*/}
            <div className='relative'>
                <MDBNavbar light bgColor='light'>
                    <MDBContainer fluid style={{height: "50px"}}>
                        <MDBDropdown group>
                            <MDBDropdownToggle color='warning' >+ Add Transaction</MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem onClick={openAddTransactionIncome} link>INCOME</MDBDropdownItem>
                                <MDBDropdownItem onClick={openAddTransactionExpense} link>EXPENSE</MDBDropdownItem>
                                <MDBDropdownItem onClick={openAddTransactionDebt} link>DEBT</MDBDropdownItem>
                                <MDBDropdownItem onClick={openAddTransactionLoan} link>LOAN</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                        <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
                            <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
                            <MDBBtn outline>Search</MDBBtn>
                        </MDBInputGroup>
                    </MDBContainer>
                </MDBNavbar>
            </div>

{/*----------- Body List Transaction ----------*/}

            <MDBTable align='middle'>
                <MDBTableHead>

                    <tr>
                        <th scope='col'>Index</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Category</th>
                        <th scope='col'>Wallet</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Lender</th>
                        <th scope='col'>Borrower</th>
                        <th scope='col'>Note</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </MDBTableHead>


                <MDBTableBody>
                    {transactionz.map((transaction, index) => (
                        <tr key={index}>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <p className='fw-bold mb-1'>{index + 1}</p>
                                    <div className='ms-3'>
                                        <FaMoneyBillTransfer style={{ width: '45px', height: '45px' }}/>

                                    </div>

                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>{transaction.amount}</p>
                                <p className='text-muted mb-0'></p>
                            </td>
                            <td>
                                <MDBBadge color='success' pill>

                                </MDBBadge>
                            </td>
                            <td></td>
                            <td>{transaction.transactionDate}</td>
                            <td>{transaction.lender}</td>
                            <td>{transaction.lender}</td>
                            <td>{transaction.borrower}</td>
                            <td>{transaction.note}</td>
                            <td>
                                {'INCOME'=== 'INCOME' && (
                                    <MDBBtn color='success' onClick={openAddTransactionIncome}>Edit</MDBBtn>
                                )}
                                {transaction.lender === 'EXPENSE' && (
                                    <MDBBtn color='primary' onClick={openAddTransactionExpense}>Edit</MDBBtn>
                                )}
                                {transaction.lender === 'DEBT' && (
                                    <MDBBtn color='secondary' onClick={openAddTransactionDebt}>Edit</MDBBtn>
                                )}
                                {transaction.lender === 'LOAN' && (
                                    <MDBBtn color='info' onClick={openAddTransactionLoan}>Edit</MDBBtn>
                                )}
                            </td>
                            <td>
                                <MDBBtn className='me-1' onClick={() => {
                                    handleDelete(transaction.id);
                                }} color='danger'>
                                    Delete
                                </MDBBtn>
                            </td>
                        </tr>
                    ))}


                </MDBTableBody>
            </MDBTable>

{/*--------   Popup Delete  --------*/}

            <MDBModal staticBackdrop tabIndex='-1' open={modalDelete} setOpen={setModalDelete}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader className="modal-header bg-danger text-white d-flex justify-content-center">
                            <MDBModalTitle>Do you want to delete the transaction?</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openDelete}></MDBBtn>
                        </MDBModalHeader>

                        <MDBModalBody></MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn className="btn btn-outline-danger" onClick={openDelete}>
                                No
                            </MDBBtn>
                            <MDBBtn className="btn btn-danger" >Delete</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

{/*------------ ADD Transaction  INCOME-------------*/}

            <MDBModal staticBackdrop tabIndex='-1' open={modalAddTransactionIncome} setOpen={setModalAddTransactionIncome}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>+ Add Income</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openAddTransactionIncome}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Form onSubmit={handleSubmit_Debt_Loan}>
                                <MDBCard className="mb-4" style={{padding: "20px"}}>
                                    <MDBCardText className="text-muted">Money number</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "35px", color: "#14A44D"}}><MdOutlineAttachMoney/></MDBCol>
                                        <MDBCol sm="10" ><MDBInput required type="number" name='amount' id='form4Example1' wrapperClass='mb-4' label='Money' value={transaction.amount} onChange={handleChange} /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Category</MDBCardText>
                                    <div className='relative'>
                                        <Select name='category_id' className="form-select" aria-label="Default select example" onChange={handleChange}>
                                            <option>Select category</option>
                                            {categories
                                                .filter(category => category.type === "INCOME") // Lọc danh sách chỉ giữ lại các danh mục có type là "INCOME"
                                                .map((category) => (
                                                    <option key={category.id} value={category.id} >
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </Select>
                                    </div>
                                    <hr/>
                                    <MDBCardText className="text-muted">Note</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "25px"}}><MdOutlineNotes /></MDBCol>
                                        <MDBCol><MDBInput name='note' value={transaction.note} onChange={handleChange} style={{height: "60px"}} wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Date</MDBCardText>
                                    <MDBRow>
                                        <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt /></MDBCol>
                                        <MDBCol sm="10"><Input required type={'date'} name='transactionDate' value={transaction.transactionDate} onChange={handleChange}></Input></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Wallets</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "30px"}}><BsWallet /></MDBCol>
                                        <MDBCol sm="10" >
                                            <div className='relative'>
                                                <Select name='wallet_id' className="form-select" aria-label="Default select example" onChange={handleChange}>
                                                    <option>Select wallet</option>
                                                    {wallets.map((wallet, index) => (
                                                        <option key={index} value={wallet.id}>
                                                            {wallet.name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCard>
                                <MDBBtn type='submit' className='mb-4 btn btn-success' block>
                                    Save
                                </MDBBtn>
                            </Form>
                        </MDBModalBody>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

{/*------------ ADD Transaction  Expense-------------*/}

            <MDBModal staticBackdrop tabIndex='-1' open={modalAddTransactionExpense} setOpen={setModalAddTransactionExpense}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>+ Add Expense</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openAddTransactionExpense}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Form onSubmit={handleSubmit_Debt_Loan}>
                                <MDBCard className="mb-4" style={{padding: "20px"}}>
                                    <MDBCardText className="text-muted">Money number</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "35px", color: "red"}}><MdOutlineAttachMoney/></MDBCol>
                                        <MDBCol sm="10" ><MDBInput type="number" name='amount' id='form4Example1' wrapperClass='mb-4' label='Money' value={transaction.amount} onChange={handleChange} /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Category</MDBCardText>
                                    <div className='relative'>
                                        <Select name='category_id' className="form-select" aria-label="Default select example" onChange={handleChange}>
                                            <option>Select category</option>
                                            {categories
                                                .filter(category => category.type === "EXPENSE") // Lọc danh sách chỉ giữ lại các danh mục có type là "INCOME"
                                                .map((category) => (
                                                    <option key={category.id} value={category.id} >
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </Select>
                                    </div>
                                    <hr/>
                                    <MDBCardText className="text-muted">Note</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "25px"}}><MdOutlineNotes /></MDBCol>
                                        <MDBCol><MDBInput name='note' value={transaction.note} onChange={handleChange} style={{height: "60px"}} wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Date</MDBCardText>
                                    <MDBRow>
                                        <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt /></MDBCol>
                                        <MDBCol sm="10"><Input type={'date'} name='transactionDate' value={transaction.transactionDate} onChange={handleChange}></Input></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Wallets</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "30px"}}><BsWallet /></MDBCol>
                                        <MDBCol sm="10" >
                                            <div className='relative'>
                                                <Select name='wallet_id' className="form-select" aria-label="Default select example" onChange={handleChange}>
                                                    <option>Select wallet</option>
                                                    {wallets.map((wallet, index) => (
                                                        <option key={index} value={wallet.id}>
                                                            {wallet.name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCard>
                                <MDBBtn type='submit' className='mb-4 btn btn-success' block>
                                    Save
                                </MDBBtn>
                            </Form>
                        </MDBModalBody>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

{/*------------ ADD Transaction  Debt-------------*/}

            <MDBModal staticBackdrop tabIndex='-1' open={modalAddTransactionDebt} setOpen={setModalAddTransactionDebt}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>+ Add Debt</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openAddTransactionDebt}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form onSubmit={handleSubmit_Debt_Loan}>
                                <MDBCard className="mb-4" style={{padding: "20px"}}>
                                    <MDBCardText className="text-muted">Money number</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "35px", color: "red"}}><MdOutlineAttachMoney/></MDBCol>
                                        <MDBCol sm="10" ><MDBInput type="number" id='form4Example1' wrapperClass='mb-4' label='Money' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Category</MDBCardText>
                                    <div className='relative'>
                                        <select className="form-select" aria-label="Default select example">
                                            {categories
                                                .filter(category => category.type === "DEBT") // Lọc danh sách chỉ giữ lại các danh mục có type là "INCOME"
                                                .map((category) => (
                                                    <option key={category.id} value={category.type}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <hr/>
                                    <MDBCardText className="text-muted">Lender</MDBCardText>
                                    <MDBCol sm="12" ><MDBInput type="text" id='form4Example1' wrapperClass='mb-4' label='Name' /></MDBCol>
                                    <hr/>
                                    <MDBCardText className="text-muted">Note</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "25px"}}><MdOutlineNotes /></MDBCol>
                                        <MDBCol><MDBInput style={{height: "60px"}} wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Start Date</MDBCardText>
                                    <MDBRow>
                                        <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt /></MDBCol>
                                        <MDBCol sm="10"><Input type={'date'}></Input></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <hr/>
                                    <MDBCardText className="text-muted">End Date</MDBCardText>
                                    <MDBRow>
                                        <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt /></MDBCol>
                                        <MDBCol sm="10"><Input type={'date'}></Input></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Wallets</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "30px"}}><BsWallet /></MDBCol>
                                        <MDBCol sm="10" >
                                            <div className='relative'>
                                                <select className="form-select" aria-label="Default select example">
                                                    {wallets.map((wallet, index) => (
                                                        <option key={index} value={wallet.name}>
                                                            {wallet.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCard>
                                <MDBBtn type='submit' className='mb-4 btn btn-success' block>
                                    Save
                                </MDBBtn>
                            </form>
                        </MDBModalBody>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

{/*------------ ADD Transaction  Loan -------------*/}

            <MDBModal staticBackdrop tabIndex='-1' open={modalAddTransactionLoan} setOpen={setModalAddTransactionLoan}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>+ Add Loan</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openAddTransactionLoan}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Form onSubmit={handleSubmit_Debt_Loan}>
                                <MDBCard className="mb-4" style={{padding: "20px"}}>
                                    <MDBCardText className="text-muted">Money number</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "35px", color: "#14A44D"}}><MdOutlineAttachMoney/></MDBCol>
                                        <MDBCol sm="10" ><MDBInput type="number" name='amount' id='form4Example1' wrapperClass='mb-4' label='Money' value={transaction.amount} onChange={handleChange} /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Category</MDBCardText>
                                    <div className='relative'>
                                        <Select name='category_id' className="form-select" aria-label="Default select example" onChange={handleChange}>
                                            {categories
                                                .filter(category => category.type === "LOAN") // Lọc danh sách chỉ giữ lại các danh mục có type là "INCOME"
                                                .map((category) => (
                                                    <option key={category.id} value={category.id} >
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </Select>
                                    </div>
                                    <hr/>
                                    <MDBCardText className="text-muted">Borrower</MDBCardText>
                                    <MDBCol sm="12" ><MDBInput name='borrower' type="text" id='form4Example1' wrapperClass='mb-4' label='Name' value={transaction.borrower} onChange={handleChange}/></MDBCol>
                                    <hr/>
                                    <MDBCardText className="text-muted">Note</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "25px"}}><MdOutlineNotes /></MDBCol>
                                        <MDBCol><MDBInput name='note' value={transaction.note} onChange={handleChange} style={{height: "60px"}} wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Start Date</MDBCardText>
                                    <MDBRow>
                                        <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt /></MDBCol>
                                        <MDBCol sm="10"><Input type={'date'} name='transactionDate' value={transaction.transactionDate} onChange={handleChange}></Input></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <hr/>
                                    <MDBCardText className="text-muted">End Date</MDBCardText>
                                    <MDBRow>
                                        <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt /></MDBCol>
                                        <MDBCol sm="10"><Input type={'date'} name='endDate' value={transaction.endDate} onChange={handleChange}></Input></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Wallets</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "30px"}}><BsWallet /></MDBCol>
                                        <MDBCol sm="10" >
                                            <div className='relative'>
                                                <Select name='wallet_id' className="form-select" aria-label="Default select example" onChange={handleChange}>
                                                    {wallets.map((wallet, index) => (
                                                        <option key={index} value={wallet.id}>
                                                            {wallet.name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCard>
                                <MDBBtn type='submit' className='mb-4 btn btn-success' block>
                                    Save
                                </MDBBtn>
                            </Form>
                        </MDBModalBody>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>

    );
}