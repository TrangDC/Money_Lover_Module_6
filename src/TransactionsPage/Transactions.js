import React, {useState} from 'react';
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
import {FaLayerGroup} from "react-icons/fa6";
import {MdOutlineAttachMoney, MdOutlineNotes} from "react-icons/md";
import {Input} from "@chakra-ui/react";


export default function Transactions() {
    const [modalDelete, setModalDelete] = useState(false);
    const  openDelete= () => setModalDelete(!modalDelete);

    const [modalAddTransaction, setModalAddTransaction] = useState(false);

    const openBoxAddTransaction = () => setModalAddTransaction(!modalAddTransaction);
    return (
        <div style={{width: "1200px", margin: "auto", marginTop: "50px"}}>

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

{/*------------ ADD Transaction  -------------*/}

            <MDBModal staticBackdrop tabIndex='-1' open={modalAddTransaction} setOpen={setModalAddTransaction}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>+ Add Transaction</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={openBoxAddTransaction}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                <MDBCard className="mb-4" style={{padding: "20px"}}>
                                    <MDBCardText className="text-muted">Money number</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "35px"}}><MdOutlineAttachMoney/></MDBCol>
                                        <MDBCol sm="10" ><MDBInput id='form4Example1' wrapperClass='mb-4' label='Money' /></MDBCol>
                                    </MDBRow>
                                    <hr/>

                                    <MDBCardText className="text-muted">Note</MDBCardText>
                                    <MDBRow>
                                        <MDBCol className="mb-4" sm="2" style={{fontSize: "25px"}}><MdOutlineNotes /></MDBCol>
                                        <MDBCol><MDBInput style={{height: "60px"}} wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="2"><MDBCardText className="text-muted">Date</MDBCardText></MDBCol>
                                        <MDBCol sm="10"><Input type={'date'}></Input></MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBCardText className="text-muted">Wallet</MDBCardText>
                                    <MDBCardText className="text-muted">Category</MDBCardText>
                                </MDBCard>

                                <MDBBtn type='submit' className='mb-4 btn btn-success' block>
                                    Save
                                </MDBBtn>
                            </form>
                        </MDBModalBody>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {/*------ add -------*/}

{/*-------------*/}
            <div className='relative'>
                <MDBNavbar light bgColor='light'>
                    <MDBContainer fluid style={{height: "50px"}}>
                        <MDBDropdown group>
                            <MDBDropdownToggle color='warning' >+ Add Transaction</MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem onClick={openBoxAddTransaction} link>EXPENSE</MDBDropdownItem>
                                <MDBDropdownItem onClick={openBoxAddTransaction} link>DEBT</MDBDropdownItem>
                                <MDBDropdownItem onClick={openBoxAddTransaction} link>INCOME</MDBDropdownItem>
                                <MDBDropdownItem onClick={openBoxAddTransaction} link>LOAN</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                        <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
                            <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
                            <MDBBtn outline>Search</MDBBtn>
                        </MDBInputGroup>
                    </MDBContainer>
                </MDBNavbar>
            </div>
            {/*---------------*/}

            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Position</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
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
                        <td>Senior</td>
                        <td>
                            <MDBBtn color='info'>
                                Edit
                            </MDBBtn>
                        </td>
                        <td>
                            <MDBBtn className='me-1' onClick={openDelete} color='danger'>
                                Delete
                            </MDBBtn>
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        </div>

    );
}