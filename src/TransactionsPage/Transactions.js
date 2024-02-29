import React, {useState} from 'react';
import {
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBContainer,
    MDBInputGroup,
    MDBInput, MDBCheckbox, MDBRow, MDBCol, MDBCard, MDBCardBody
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
                                <MDBCardText className="text-muted">Money number</MDBCardText>
                                <MDBRow>
                                    <MDBCol className="mb-4"><FaLayerGroup /></MDBCol>
                                    <MDBCol><MDBInput id='form4Example1' wrapperClass='mb-4' label='Name' /></MDBCol>
                                </MDBRow>
                                <MDBCardText className="text-muted">Choose group</MDBCardText>
                                <MDBInput type='email' id='form4Example2' wrapperClass='mb-4' label='Email address' />

                                <MDBInput wrapperClass='mb-4' textarea id='form4Example3' rows={4} label='Message' />



                                {/*------- add ---------*/}
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                                <FaLayerGroup />
                                                <MDBInput id='form4Example1' wrapperClass='mb-4' label='Name' />
                                            </MDBListGroupItem>
                                        </MDBRow>

                                        <MDBRow>
                                            <MDBCol sm="1">
                                                <FaLayerGroup />
                                            </MDBCol>
                                            <MDBCol sm="3">
                                                <MDBCardText>Full Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBInput id='form4Example1' wrapperClass='mb-4' label='Name' />
                                            </MDBCol>
                                        </MDBRow>

                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="1">
                                                <FaLayerGroup />
                                            </MDBCol>
                                            <MDBCol sm="3">
                                                <MDBCardText>Full Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Phone</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Mobile</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Address</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
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

            {/*-----------*/}
            <MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                    <MDBBtn onClick={openBoxAddTransaction} className='me-1' color='warning'>
                        + Add Transaction
                    </MDBBtn>
                    <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
                        <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
                        <MDBBtn outline>Search</MDBBtn>
                    </MDBInputGroup>
                </MDBContainer>
            </MDBNavbar>

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