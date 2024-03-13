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
} from 'mdb-react-ui-kit';
import "./Introduce.css"
import {MdOutlineAttachMoney} from "react-icons/md";
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
                                <MDBNavbarLink active aria-current='page' href='#'>
                                    Về chúng tôi
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem style={{marginLeft:'20px'}}>
                                <MDBNavbarLink active aria-current='page' href='#'>Tuyển dụng</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <div className='language' style={{marginLeft:'20px'}}>
                                    <div style={{width: '30px', marginTop:'10px'}}>
                                        <img src="https://product.hstatic.net/200000122283/product/c-e1-bb-9d-vi-e1-bb-87t-nam_2c0683597d2d419fac401f51ccbae779_master.jpg" alt=""/>
                                    </div>
                                    <MDBNavbarLink>Tiếng Việt</MDBNavbarLink>
                                </div>
                                
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <div className='content'>
                <p className='h1-content'>Cách đơn giản nhất</p>
                <p><span className='h2-content'>để quản lý </span> <span className='h3-content'>tài chính cá nhân </span></p>
                <p></p>
            </div>
            <div className='container-body'>
                <MDBBtn style={{width: '200px', height: '40px'}} className='me-2' color='success'>Login</MDBBtn>
            </div>
            <div className='footer'>

            </div>

        </div>
    );
};

export default Introduce;