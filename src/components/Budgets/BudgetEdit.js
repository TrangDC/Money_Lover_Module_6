import React from 'react';
import {MDBBtn, MDBCheckbox, MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";
import "./BudgetEdit.css"
import {MDBCardText} from "mdbreact";
import {IoCloseOutline} from "react-icons/io5";
import {Input, Select} from "@chakra-ui/react";
import {MdOutlineAttachMoney} from "react-icons/md";
import {FaRegCalendarAlt} from "react-icons/fa";
import {BsWallet} from "react-icons/bs";

const BudgetEdit = () => {
    return (
        <div className="form-body">
            <div className="btn-x">
                <div className="sub-btn-x"><IoCloseOutline /></div>
            </div>
            <form>
                <h4 className="title">Edit Budget</h4>
                <MDBRow>
                    <MDBCol className="mb-4 add-money" sm="1">
                        <MdOutlineAttachMoney />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput id='form6Example1' label='Money number' sm="11" name='amount' value="" />
                    </MDBCol>
                </MDBRow>
                <MDBRow className='mb-4'>
                    <MDBCardText className="text-muted">Category</MDBCardText>
                    <Select name='category_type' className="form-select" aria-label="Default select example" value="">
                        <option value='all'>---Select category---</option>
                        <option value='INCOME'>INCOME</option>
                        <option value='EXPENSE'>EXPENSE</option>
                        <option value='DEBT'>DEBT</option>
                        <option value='LOAN'>LOAN</option>
                    </Select>
                </MDBRow>
                <MDBRow>
                    <MDBCardText className="text-muted">Start Date</MDBCardText>
                    <MDBRow>
                        <MDBCol sm="2" style={{ fontSize: "30px" }}><FaRegCalendarAlt /></MDBCol>
                        <MDBCol sm="10"><Input required type={'date'} name='transactionDate' value=""></Input></MDBCol>
                    </MDBRow>
                </MDBRow>
                <MDBRow>
                    <MDBCardText className="text-muted">Wallets</MDBCardText>
                    <MDBRow>
                        <MDBCol className="mb-4" sm="2" style={{ fontSize: "30px" }}><BsWallet /></MDBCol>
                        <MDBCol sm="10" >
                            <div className='relative'>
                                <Select name='wallet_id' className="form-select" aria-label="Default select example">
                                    <option>Select wallet</option>
                                </Select>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBRow>

                <MDBBtn className='mb-4' type='submit' block>
                    Save
                </MDBBtn>
            </form>
        </div>
    );
};

export default BudgetEdit;