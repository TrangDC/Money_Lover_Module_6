import React from 'react';
import {MDBBtn, MDBCheckbox, MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";
import "./CreateTransaction.css";
import {MDBCardText} from "mdbreact";
import {Input, Select} from "@chakra-ui/react";
import {FaRegCalendarAlt} from "react-icons/fa";
import {BsWallet} from "react-icons/bs";
import {MdOutlineAttachMoney} from "react-icons/md";
const CreateTransaction = () => {
    return (
        <div>
            <div className="form-body">
                <form>
                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol className="mb-4" sm="1" style={{fontSize: "35px", color: "#14A44D"}}><MdOutlineAttachMoney/></MDBCol>
                                <MDBCol><MDBInput id='form6Example1' label='Money number' sm="11"/></MDBCol>
                            </MDBRow>
                            <MDBCardText className="text-muted">Category</MDBCardText>
                            <Select name='category_id' className="form-select" aria-label="Default select example">
                                <option>Select category</option>
                                <option>Select category</option>
                                <option>Select category</option>
                                <option>Select category</option>
                            </Select>
                            <MDBCardText className="text-muted">Sub Category</MDBCardText>
                            <Select name='category_id' className="form-select" aria-label="Default select example">
                                <option>Select category</option>
                                <option>Select category</option>
                                <option>Select category</option>
                                <option>Select category</option>
                            </Select>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput wrapperClass='mb-4' id='form6Example3' label='Lender' />
                            <MDBInput wrapperClass='mb-4' id='form6Example4' label='Borrower' />
                            <MDBInput wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Note' style={{height: "100px"}} />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBCardText className="text-muted">Start Date</MDBCardText>
                            <MDBRow>
                                <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt /></MDBCol>
                                <MDBCol sm="10"><Input required type={'date'} name='transactionDate'></Input></MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol>
                            <MDBCardText className="text-muted">End Date</MDBCardText>
                            <MDBRow>
                                <MDBCol sm="2" style={{fontSize: "30px"}}><FaRegCalendarAlt /></MDBCol>
                                <MDBCol sm="10"><Input required type={'date'} name='transactionDate'></Input></MDBCol>
                            </MDBRow>
                        </MDBCol>

                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBCardText className="text-muted">Wallets</MDBCardText>
                            <MDBRow>
                                <MDBCol className="mb-4" sm="2" style={{fontSize: "30px"}}><BsWallet /></MDBCol>
                                <MDBCol sm="10" >
                                    <div className='relative'>
                                        <Select name='wallet_id' className="form-select" aria-label="Default select example" >
                                            <option>Select wallet</option>
                                            <option>Select wallet</option>
                                            <option>Select wallet</option>
                                        </Select>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol className="btn_submit">
                            <MDBBtn type="submit" className='me-1' color='success'>
                                Submit
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </form>
            </div>
        </div>
    );
};

export default CreateTransaction;