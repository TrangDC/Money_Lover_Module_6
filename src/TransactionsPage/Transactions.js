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
import {Input} from "@chakra-ui/react";
import axios from "axios";
import {FaRegCalendarAlt} from "react-icons/fa";
import {BsWallet} from "react-icons/bs";



export default function Transactions() {

// ------ Popup Delete --------
        const [modalDelete, setModalDelete] = useState(false);
        const  openDelete= () => setModalDelete(!modalDelete);

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
        const [transaction, setTransaction] = useState({
            amount: "",
            category: "",
            note: "",
            andDate: "",
            lender: "",
            borrower: "",
            wallet: "",
            transactionDate: ""
        })

        const getTransactions = (userdata) => {
            axios.get('http://localhost:8080/api/users/' + userdata.id)
                .then((res) => {
                    console.log(res)
                    window.localStorage.setItem("transactions", JSON.stringify(res.data.transactions));
                    const transactions = JSON.parse(localStorage.getItem("transactions"));
                    setTransactions(transactions);
                })
        }
        useEffect(() => {
            const userdata = JSON.parse(localStorage.getItem("user"));
            setUserData(userdata);
            getTransactions(userdata)
        }, [transaction])

// --------- Get Wallets --------
    const [wallets, setWallets] = useState([])
    const [wallet, setWallet] = useState({
        name: "",
        balance: ""
    })
    const [userData, setUserData] = useState({})
    const fetchWallet = (userdata) => {
        axios.get('http://localhost:8080/api/users/' + userdata.id)
            .then((res) => {
                window.localStorage.setItem("wallets", JSON.stringify(res.data.wallets));
                const wallets = JSON.parse(localStorage.getItem("wallets"));
                setWallets(wallets);
            })
    }
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"));
        setUserData(userdata);
        fetchWallet(userdata)
    }, [wallet])

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
                        <th scope='col'>Name</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Category</th>
                        <th scope='col'>Wallet</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Lender</th>
                        <th scope='col'>Borrower</th>
                        <th scope='col'>Note</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {transactions.map((transaction) => {
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>John Doe</p>
                                        <p className='text-muted mb-0'>john.doe@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Software engineer</p>
                                <p className='text-muted mb-0'>IT department</p>
                            </td>
                            <td>
                                <MDBBadge color='success' pill>
                                    Active
                                </MDBBadge>
                            </td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.wallet}</td>
                            <td>Senior</td>
                            <td>Senior</td>
                            <td>Senior</td>
                            <td>
                                <MDBDropdown group>
                                    <MDBDropdownToggle color='info' >Edit</MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem onClick={openAddTransactionIncome} link>INCOME</MDBDropdownItem>
                                        <MDBDropdownItem onClick={openAddTransactionExpense} link>EXPENSE</MDBDropdownItem>
                                        <MDBDropdownItem onClick={openAddTransactionDebt} link>DEBT</MDBDropdownItem>
                                        <MDBDropdownItem onClick={openAddTransactionLoan} link>LOAN</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </td>
                            <td>
                                <MDBBtn className='me-1' onClick={openDelete} color='danger'>
                                    Delete
                                </MDBBtn>
                            </td>
                        </tr>
                    })}

                </MDBTableBody>
            </MDBTable>


{/*------------ ADD Transaction  INCOME-------------*/}

            <MDBModal staticBackdrop tabIndex='-1' open={modalAddTransactionIncome} setOpen={setModalAddTransactionIncome}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>+ Add Transaction</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openAddTransactionIncome}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                <MDBCard className="mb-4" style={{padding: "20px"}}>
                                    <MDBCardText className="text-muted">Money number</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "35px", color: "#14A44D"}}><MdOutlineAttachMoney/></MDBCol>
                                        <MDBCol sm="10" ><MDBInput type="number" id='form4Example1' wrapperClass='mb-4' label='Money' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Category</MDBCardText>
                                    <div className='relative'>
                                        <select className="form-select" aria-label="Default select example">
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            <option value="4">Four</option>
                                        </select>
                                    </div>
                                    <hr/>
                                    <MDBCardText className="text-muted">Note</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "25px"}}><MdOutlineNotes /></MDBCol>
                                        <MDBCol><MDBInput style={{height: "60px"}} wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Date</MDBCardText>
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

{/*------------ ADD Transaction  Expense-------------*/}

            <MDBModal staticBackdrop tabIndex='-1' open={modalAddTransactionExpense} setOpen={setModalAddTransactionExpense}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>+ Add Transaction</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openAddTransactionExpense}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
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
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            <option value="4">Four</option>
                                            <option value="4">Four</option>
                                        </select>
                                    </div>
                                    <hr/>
                                    <MDBCardText className="text-muted">Note</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "25px"}}><MdOutlineNotes /></MDBCol>
                                        <MDBCol><MDBInput style={{height: "60px"}} wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Date</MDBCardText>
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

{/*------------ ADD Transaction  Debt-------------*/}

            <MDBModal staticBackdrop tabIndex='-1' open={modalAddTransactionDebt} setOpen={setModalAddTransactionDebt}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>+ Add Transaction</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openAddTransactionDebt}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
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
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            <option value="4">Four</option>
                                            <option value="4">Four</option>
                                        </select>
                                    </div>

                                    <hr/>
                                    <MDBCardText className="text-muted">Lender</MDBCardText>
                                    <MDBCol sm="12" ><MDBInput type="text" id='form4Example1' wrapperClass='mb-4' label='Name' /></MDBCol>
                                    <hr/>
                                    <MDBCardText className="text-muted">Borrower</MDBCardText>
                                    <MDBCol sm="12" ><MDBInput type="text" id='form4Example1' wrapperClass='mb-4' label='Name' /></MDBCol>
                                    <hr/>
                                    <MDBCardText className="text-muted">Note</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "25px"}}><MdOutlineNotes /></MDBCol>
                                        <MDBCol><MDBInput style={{height: "60px"}} wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Date</MDBCardText>
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
                            <MDBModalTitle>+ Add Transaction</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openAddTransactionLoan}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                <MDBCard className="mb-4" style={{padding: "20px"}}>
                                    <MDBCardText className="text-muted">Money number</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "35px", color: "#14A44D"}}><MdOutlineAttachMoney/></MDBCol>
                                        <MDBCol sm="10" ><MDBInput type="number" id='form4Example1' wrapperClass='mb-4' label='Money' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Category</MDBCardText>
                                    <div className='relative'>
                                        <select className="form-select" aria-label="Default select example">
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            <option value="4">Four</option>
                                        </select>
                                    </div>
                                    <hr/>
                                    <MDBCardText className="text-muted">Lender</MDBCardText>
                                    <MDBCol sm="12" ><MDBInput type="text" id='form4Example1' wrapperClass='mb-4' label='Name' /></MDBCol>
                                    <hr/>
                                    <MDBCardText className="text-muted">Borrower</MDBCardText>
                                    <MDBCol sm="12" ><MDBInput type="text" id='form4Example1' wrapperClass='mb-4' label='Name' /></MDBCol>
                                    <hr/>
                                    <MDBCardText className="text-muted">Note</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "25px"}}><MdOutlineNotes /></MDBCol>
                                        <MDBCol><MDBInput style={{height: "60px"}} wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Date</MDBCardText>
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
                            <MDBBtn className="btn btn-danger">Delete</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>

    );
}