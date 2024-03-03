import React, {useEffect, useState} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, MDBRow, MDBCol, MDBContainer
} from 'mdb-react-ui-kit';
import  "./Wallet.css"
import {IoIosArrowRoundBack} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {FaUserTie, FaWallet} from "react-icons/fa";
import {MdOutlineClose} from "react-icons/md";

const Wallet = () => {

    const [showCard2, setShowCard2] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(false);
    const navigate = useNavigate()
    const handleClickX = () => {
        setShowCard2(false)
        setSelectedWallet(false)
    }
    const handleWalletClick = () => {
        setShowCard2(true)
        setSelectedWallet(true)
    }
    return (
    <div>
        <div className="container">
                <div className="header-wallet">
                    <div className="icon-back" onClick={() => navigate("/active")}>
                        <IoIosArrowRoundBack />
                    </div>
                    <div className="text-my-wallet">
                        <h4>My Wallet</h4>
                    </div>
                </div>
            <MDBContainer  className={`container-wallet ${selectedWallet?'selected' : ''}`} >
                <div className={`wallets ${selectedWallet?'selected' : ''}`}>
                    <MDBCard >
                        <MDBCardBody style={{ backgroundColor: "#f6f3f3"}}>
                            <MDBCardTitle>Wallets</MDBCardTitle>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard className={`card1 ${selectedWallet?'selected' : ''}`} onClick={handleWalletClick}>
                        <MDBCardBody className="card-body">
                            <MDBRow className="wallet" >
                                <MDBCol md='2'>
                                    <div className="wallet-icon">
                                        <FaWallet />
                                    </div>
                                </MDBCol>
                                <MDBCol className="content-wallet" md='10'>
                                    <MDBCardText  >
                                        Ví sinh hoạt
                                    </MDBCardText>
                                    <MDBCardText>
                                        3.000.000 vnd
                                    </MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard className={`card1 ${selectedWallet?'selected' : ''}`} onClick={handleWalletClick}>
                        <MDBCardBody className="card-body">
                            <MDBRow className="wallet" >
                                <MDBCol md='2'>
                                    <div className="wallet-icon">
                                        <FaWallet />
                                    </div>
                                </MDBCol>
                                <MDBCol className="content-wallet" md='10'>
                                    <MDBCardText  >
                                        Ví kinh doanh
                                    </MDBCardText>
                                    <MDBCardText>
                                        90.000.000 vnd
                                    </MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </div>
                <div className={`card2 ${selectedWallet?'selected' : ''}`}>
                    { showCard2 && (
                        <MDBCard>
                            <div className="btn-x" onClick={handleClickX}>
                                <MdOutlineClose />
                            </div>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCardTitle>Thông tin chi tiết ví</MDBCardTitle>
                                    <hr/>
                                    <MDBRow className="wallet-infomation">
                                        <MDBCol md='2'>
                                            <div className="wallet-icon">
                                                <FaWallet />
                                            </div>
                                        </MDBCol>
                                        <MDBCol className="content-wallet" md='10'>
                                            <MDBCardText  >
                                                Ví sinh hoạt
                                            </MDBCardText>
                                            <MDBCardText>
                                                Việt Nam Đồng
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>

                                    <MDBRow className="wallet-infomation">
                                        <MDBCol md='2'>
                                            <div className="wallet-icon">
                                                <FaUserTie />
                                            </div>
                                        </MDBCol>
                                        <MDBCol className="content-wallet" md='10'>
                                            <MDBCardText  >
                                                Người dùng
                                            </MDBCardText>
                                            <MDBCardText  >
                                                Design97.ae@gmail.com
                                            </MDBCardText>
                                            <MDBCardText>
                                                sol77
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    )}
                </div>
            </MDBContainer>
        </div>

    </div>
    );
};

export default Wallet;