import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem, MDBCol, MDBRow, MDBInput, MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText
} from 'mdb-react-ui-kit';
import "./Introduce.css"
import {MdOutlineAttachMoney} from "react-icons/md";
import {Link} from "react-router-dom";
const Introduce = () => {
    return (
        <div>
            <MDBNavbar expand='lg' light bgColor='light' style={{height: '80px'}}>
                <MDBContainer fluid>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarRightAlignExample'
                        aria-controls='navbarRightAlignExample'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <div style={{maxWidth: '220px', height:'auto', marginLeft: '200px'}}>
                        <img src="https://my.moneylover.com/wp-content/uploads/2019/06/Y6DwE.png" alt=""/>
                    </div>
                    <MDBCollapse navbar style={{ marginRight: '200px'}}>
                        <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='https://finsify.com/'>
                                    About us
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem style={{marginLeft:'20px'}}>
                                <MDBNavbarLink active aria-current='page' href='https://moneylover.me/vi/career'>Career</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <div className='language' style={{marginLeft:'20px'}}>
                                    <div style={{width: '30px', marginTop:'10px'}}>
                                        <img src="https://thietbidoandoi.com/wp-content/uploads/2022/04/co-anh.png" alt=""/>
                                    </div>
                                    <MDBNavbarLink>Language</MDBNavbarLink>
                                </div>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <div className='content'>
                <p className='h1-content'>Simple way</p>
                <p><span className='h2-content'>to manage </span> <span className='h3-content'>personal finances </span></p>
                <p></p>
            </div>
            <div className='container-body'>
                <Link to={'/login'}><MDBBtn style={{width: '200px', height: '40px'}} className='me-2' color='success'>Login</MDBBtn></Link>
            </div>
            <div className='footer'>
                <MDBCard className='card-container'>
                    <MDBCardBody className='card-sub'>
                        <div style={{width: '50px', marginBottom: '20px'}}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/upload-img-76277.appspot.com/o/images%2Fclave.png?alt=media&token=9b14b406-2fb6-4513-aad5-d5fb034415b7" alt=""/>
                        </div>
                        <h4><b>100% Secured data</b></h4>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className='card-container'>
                    <MDBCardBody className='card-sub'>
                        <div style={{width: '50px', marginBottom: '20px'}}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/upload-img-76277.appspot.com/o/images%2Fbusiness-people.png?alt=media&token=4e2c60cd-f7ad-4fec-8a97-71106d65f7db" alt=""/>
                        </div>
                        <h4><b>1 Million+ users</b></h4>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className='card-container'>
                    <MDBCardBody className='card-sub'>
                        <div style={{width: '50px', marginBottom: '20px'}}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/upload-img-76277.appspot.com/o/images%2Fcustomer-review.png?alt=media&token=86005d66-99be-44ca-9d8b-b1fb4ebd4598" alt=""/>
                        </div>
                        <h4><b>100K+ 5-star Reviews</b></h4>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className='card-container'>
                    <MDBCardBody className='card-sub'>
                        <div style={{width: '50px', marginBottom: '20px'}}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/upload-img-76277.appspot.com/o/images%2Fevaluar.png?alt=media&token=c62557ab-c72d-44ce-b862-14cdcdd6fd4d" alt=""/>
                        </div>
                        <h4><b>App of the day</b></h4>
                    </MDBCardBody>
                </MDBCard>
            </div>

        </div>
    );
};

export default Introduce;