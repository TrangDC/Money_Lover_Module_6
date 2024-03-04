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
import axios from "axios";

const Wallet = () => {

    const [showCard2, setShowCard2] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(false);
    const navigate = useNavigate()
    const handleClickX = () => {
        setShowCard2(false)
        setSelectedWallet(false)
    }
    const handleWalletClick = (wallet) => {
        setShowCard2(true)
        setSelectedWallet(wallet)
    }
// get wallet
    const [wallets, setWallets] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"));
        console.log(userdata);
        setUser(userdata)
        fetchWallets(userdata);
    }, []);

    const fetchWallets = (userdata) => {
        axios.get('http://localhost:8080/api/wallets/user/' + userdata.id)
            .then((res) => {
                console.log(res.data);

                window.localStorage.setItem("wallets", JSON.stringify(res.data));
                const wallets = JSON.parse(localStorage.getItem("wallets"));
                setWallets(wallets);
            })
            .catch((err) => console.error(err));
    };

    return (
    <div>
        <div className="container">

            <MDBContainer  className={`container-wallet ${selectedWallet?'selected' : ''}`} >

                <div className={`wallets ${selectedWallet?'selected' : ''}`}>
                    <div className="header-wallet">
                        <button type="button" className="button">
                            <span className="button__text">Add Wallet</span>
                            <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height={24} fill="none" className="svg"><line y2={19} y1={5} x2={12} x1={12} /><line y2={12} y1={12} x2={19} x1={5} /></svg></span>
                        </button>
                    </div>
                    <MDBCard >
                        <MDBCardBody style={{ backgroundColor: "#f6f3f3"}}>
                            <MDBCardTitle>Wallets</MDBCardTitle>
                        </MDBCardBody>
                    </MDBCard>
                    {wallets.map(wallet => (
                        <MDBCard className={`card1 ${selectedWallet?'selected' : ''}`} onClick={() => handleWalletClick(wallet)}>
                            <MDBCardBody className="card-body">
                                <MDBRow className="wallet" >
                                    <MDBCol md='2'>
                                        <div className="wallet-icon">
                                            <FaWallet />
                                        </div>
                                    </MDBCol>
                                    <MDBCol className="content-wallet" md='10'>
                                        <MDBCardText  >
                                            {wallet.name}
                                        </MDBCardText>
                                        <MDBCardText>
                                            {wallet.balance} vnd
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        ))}
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
                                                {selectedWallet.name}
                                            </MDBCardText>
                                            <MDBCardText>
                                                {selectedWallet.balance} vnd
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>

                                    <MDBRow className="wallet-infomation mb-3">
                                        <MDBCol>
                                            <div className="wallet-icon">
                                                <FaUserTie />
                                            </div>
                                        </MDBCol>
                                        <MDBCol className="content-wallet" md='10'>
                                            <MDBCardText  >
                                                Người dùng
                                            </MDBCardText>
                                            <MDBCardText  >
                                                {user.name}
                                            </MDBCardText>
                                            <MDBCardText>
                                                {user.email}
                                            </MDBCardText>
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBBtn className='me-1' color='danger'>
                                                Delete
                                            </MDBBtn>
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBBtn color='info'>
                                                Info
                                            </MDBBtn>
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