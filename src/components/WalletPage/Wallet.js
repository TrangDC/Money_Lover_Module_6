import React, {useEffect, useState} from 'react';
import {useChangeNotification} from "../../ChangeNotificationContext";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, MDBRow, MDBCol, MDBContainer
} from 'mdb-react-ui-kit';
import "./Wallet.css"
import {useNavigate} from "react-router-dom";
import {FaShareAlt, FaUserCheck, FaUserTie, FaWallet} from "react-icons/fa";
import {MdOutlineClose} from "react-icons/md";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Input, Select, useToast, WrapItem} from "@chakra-ui/react";
import {GiPiggyBank} from "react-icons/gi";
import {IoAddCircle, IoMail} from "react-icons/io5";
import {BsChatLeftTextFill} from "react-icons/bs";
import {BiSolidHappy, BiSolidHappyHeartEyes} from "react-icons/bi";
import {RiEmotionHappyLine} from "react-icons/ri";
import {TbMoodCrazyHappy, TbMoodHappy} from "react-icons/tb";

const Wallet = () => {
    const { notifyWalletChange } = useChangeNotification();
    const [showCard2, setShowCard2] = useState(false)
    const [showCardShare, setShowCardShare] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(false);
    const [selectedShareWallet, setSelectedShareWallet] = useState(false);
    const [wallet_id, setWallet_id] = useState(0);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('all');
    const navigate = useNavigate()
    const [select, setSelect] = useState()
    const [owner, setOwner] = useState([])
    const handleClickX = () => {
        setShowCard2(false)
        setSelectedWallet(false)
        setShowCardShare(false)
        setSelectedShareWallet(false)
    }
    const handleClickShareWallet = (dataWallet, role) => {
        axios.get('http://localhost:8080/api/users/wallet/' + dataWallet.id)
            .then(res => {
            setOwner(res.data);
            setShowCard2(false)
            setShowCardShare(true);
            setSelectedShareWallet(dataWallet);
            setRole(role)
        })


    }
    const handleWalletClick = (wallet) => {
        setShowCardShare(false);
        setShowCard2(true)
        setSelectedWallet(wallet)
        setWallet_id(wallet.id)
    }
    const [wallets, setWallets] = useState([])
    const [wallets_shared, setWalletShared] = useState([])
    const [user, setUser] = useState({})


    const fetchWallets = (userdata) => {
        axios.get('http://localhost:8080/api/wallets/user/' + userdata.id)
            .then((res) => {
                console.log(res.data);
                notifyWalletChange();

                window.localStorage.setItem("wallets", JSON.stringify(res.data));
                const wallets = JSON.parse(localStorage.getItem("wallets"));
                setWallets(wallets);
            })
            .catch((err) => console.error(err));
    };
    const fetchWalletsShare = (userdata) => {
        axios.get('http://localhost:8080/api/shared_wallets/user/' + userdata.id)
            .then((res) => {
                console.log(res.data);
                notifyWalletChange();
                window.localStorage.setItem("wallets_shared", JSON.stringify(res.data));
                const wallets = JSON.parse(localStorage.getItem("wallets_shared"));
                setWalletShared(wallets);
            })
            .catch((err) => console.error(err));
    };
    // share wallet
    const [showShare, setShowShare] = useState(false)
    const closeShare = () => {
        setShowShare(false)
    }
    const handleShare = () => {
        setShowShare(true)
    }

    // craete wallet
    const [wallet, setWallet] = useState({
        name: '',
        balance: ''
    });
    const toast = useToast()
    const [showC, setShowC] = useState(false);
    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);
    const handleSubmitC = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/wallets/user/${user.id}/create`, wallet)
            .then(res => {
                console.log(res);
                notifyWalletChange();
                navigate("/auth/wallets")
                handleCloseC();
                fetchWallets(user);
                toast({
                    title: 'Create success!',
                    description: 'You successfully created a wallet!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
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

    // delete wallet
    const [selectedWalletId, setSelectedWalletId] = useState(null);
    const [editWallet, setEditWallet] = useState({
        name: '',
        balance: ''
    });
    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this wallet?');
        if (confirmDelete) {
            axios.put(`http://localhost:8080/api/wallets/user/${user.id}/deactivate/${id}`)
                .then(res => {
                    notifyWalletChange();
                    navigate("/auth/wallets");
                    fetchWallets(user);
                    toast({
                        title: 'Delete Successful',
                        description: 'You have successfully deleted the wallet!',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                    });
                    setShowCard2(false); // Đóng lại phần card khi xóa thành công
                    setSelectedWallet(null); // Xóa dữ liệu ví đã chọn
                })
                .catch(err => toast({
                    title: 'Delete Failed',
                    description: 'Failed to delete the wallet!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                }));
        }
    };

    //update wallet
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (walletId) => {
        setSelectedWalletId(walletId);
        setShow(true);
        const selectedWallet = wallets.find(wallet => wallet.id === walletId);
        setEditWallet(selectedWallet);
    };
    const handleShowM = (walletId) => {
        setSelectedWalletId(walletId);
        setShowM(true);
        const selectedWallet = wallets.find(wallet => wallet.id === walletId);
        setEditWallet(selectedWallet);
    };
    const handleShowShareM = (selectShareWallet) => {
        setSelectedWalletId(selectShareWallet.id);
        setShow(true);
        // const selectShareWallet = wallets_shared.find(data.wallet => data.wallet.id === walletId);
        setEditWallet(selectShareWallet);
    };
    const handleShowShare = (selectShareWallet) => {
        setSelectedWalletId(selectShareWallet.id);
        setShow(true);
        // const selectShareWallet = wallets_shared.find(data.wallet => data.wallet.id === walletId);
        setEditWallet(selectShareWallet);
    };
    const handleUpdate = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:8080/api/wallets/user/${user.id}/edit/${selectedWalletId}`, editWallet)
            .then((res) => {
                console.log(res.data);
                notifyWalletChange();
                navigate("/auth/wallets")
                fetchWallets(user);
                handleClose();
                toast({
                    title: 'Update Successful',
                    description: 'You successfully repaired your wallet!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
                handleClickX();

            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: 'Update Failed',
                    description: 'You failed to repair your wallet!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    // more money
    const [showM, setShowM] = useState(false);
    const handleCloseM = () => setShowM(false);



    const handleSubmitM = (event) => {
        event.preventDefault();
        const money = parseFloat(event.target.money.value);
        axios.put(`http://localhost:8080/api/wallets/user/${user.id}/add_money/${selectedWalletId}/${money}`, {money: money})
            .then((res) => {
                console.log(res.data);
                notifyWalletChange();
                handleCloseM();
                fetchWallets(user);
                toast({
                    title: 'Money added successfully',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: 'Failed to add money',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    function handleShareWallet(event) {
        event.preventDefault();
        const data = {
            wallet_id: wallet_id,
            email: email,
            role: role
        }
        axios.post(`http://localhost:8080/api/shared_wallets/`, data)
            .then(res => {
                console.log(res);
                notifyWalletChange();
                navigate("/auth/wallets")
                closeShare();
                fetchWallets(user);
                toast({
                    title: 'Share success!',
                    description: 'You successfully share a wallet!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
            })
            .catch(err => {
                console.error(err);
                toast({
                    title: 'Share Failed',
                    description: 'Failed to share a wallet!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    }

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"));
        console.log(userdata);
        setUser(userdata)
        notifyWalletChange();
        fetchWallets(userdata);
        fetchWalletsShare(userdata)
    }, [show, showShare, showCardShare, showCard2]);

    return (
        <div>
            <div className="container">

                <MDBContainer className={`container-wallet ${selectedWallet ? 'selected' : ''} ${selectedShareWallet ? 'selectedShare' : ''}`}>
                    <div className={`wallets ${selectedWallet ? 'selected' : ''} ${selectedShareWallet ? 'selectedShare' : ''}`}>
                        <div className="header-wallet">
                            <button type="button" className="button" onClick={handleShowC}>
                                <span className="button__text">Add Wallet</span>
                                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width={24}
                                                                    viewBox="0 0 24 24" strokeWidth={2}
                                                                    strokeLinejoin="round" strokeLinecap="round"
                                                                    stroke="currentColor" height={24} fill="none"
                                                                    className="svg"><line y2={19} y1={5} x2={12}
                                                                                          x1={12}/><line y2={12} y1={12}
                                                                                                         x2={19}
                                                                                                         x1={5}/></svg></span>
                            </button>
                        </div>
                        {/*wallets list*/}
                        <MDBCard style={{borderRadius: "10px"}}>
                            <MDBCardBody style={{backgroundColor: "#f6f3f3",borderRadius: '10px'}}>
                                <MDBCardTitle>Wallets</MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>
                        <div style={{overflowY: 'auto', maxHeight: '600px', marginBottom: '20px'}}>
                            {wallets.map(wallet => (
                                <MDBCard className={`card1 ${selectedWallet ? 'selected' : ''}`}>
                                    <MDBCardBody className="card-body">
                                        <MDBRow className="wallet">
                                            <MDBCol md='2' onClick={() => handleWalletClick(wallet)}>
                                                <div className="wallet-icon">
                                                    <img src="https://static.moneylover.me/img/icon/icon.png"
                                                         alt="Wallet Icon"
                                                         style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                                </div>
                                            </MDBCol>
                                            <MDBCol className="content-wallet" md='8'
                                                    onClick={() => handleWalletClick(wallet)}>
                                                <MDBCardText>
                                                    {wallet.name}
                                                </MDBCardText>
                                                <MDBCardText style={{fontWeight: '600'}}>
                                                    {wallet.balance.toLocaleString()} VNĐ
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol style={{flex: 4}}>
                                                <GiPiggyBank onClick={() => handleShowM(wallet.id)}
                                                             style={{width: '40px', height: '40px'}}
                                                             className="text-green-400"/>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            ))}
                        </div>
                        {/*wallets share*/}
                        <MDBCard>
                            <MDBCardBody style={{backgroundColor: "#f6f3f3", borderRadius: '10px', fontSize:'25px'}}>
                                <MDBCol md='3'><MDBCardTitle >Wallets Share</MDBCardTitle></MDBCol>
                                <MDBCol md='9' style={{color: "#2a77ce"}}><FaShareAlt /></MDBCol>
                            </MDBCardBody>
                        </MDBCard>
                        <div style={{overflowY: 'auto', maxHeight: '220px'}}>
                            {wallets_shared.map(data => (
                                <MDBCard className={`card1 ${selectedWallet ? 'selectedShare' : ''}`}>
                                    <MDBCardBody className="card-body">
                                        <MDBRow className="wallet">
                                            <MDBCol md='2' onClick={() => handleClickShareWallet(data.wallet, data.role)}>
                                                <div className="wallet-icon">
                                                    <img src="https://static.moneylover.me/img/icon/icon.png"
                                                         alt="Wallet Icon"
                                                         style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                                </div>
                                            </MDBCol>
                                            <MDBCol className="content-wallet" md='8'
                                                    onClick={() => handleClickShareWallet(data.wallet, data.role)}>
                                                <MDBCardText>
                                                    {data.wallet.name}
                                                </MDBCardText>
                                                <MDBCardText style={{fontWeight: '600'}}>
                                                    {data.wallet.balance.toLocaleString()} VNĐ
                                                </MDBCardText>
                                            </MDBCol>
                                            {data.role === 'USABLE' ? (
                                                <MDBCol style={{flex: 4}}>
                                                    <GiPiggyBank onClick={() => handleShowShareM(data.wallet)}
                                                                 style={{width: '40px', height: '40px'}}
                                                                 className="text-green-400"/>
                                                </MDBCol>
                                            ) : (
                                                <MDBCol style={{flex: 4}}>
                                                </MDBCol>
                                            )}
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            ))}
                        </div>
                    </div>

                    {/*Wallet detail*/}
                    <div className={`card2 ${selectedWallet ? 'selected' : ''}`}>
                        {showCard2 && (
                            <MDBCard>
                                <div className="btn-x" onClick={handleClickX}>
                                    <MdOutlineClose/>
                                </div>
                                <MDBCardBody>
                                    <MDBRow style={{textAlign: 'center'}}>
                                        <MDBCardTitle style={{margin: '-15px 0 30px 0'}}>WALLET DETAILS <hr/></MDBCardTitle>

                                        <MDBRow className="wallet-infomation">
                                            <MDBCol md='2'>
                                                <div className="wallet-icon">
                                                    <img src="https://static.moneylover.me/img/icon/icon.png"
                                                         alt="Wallet Icon"
                                                         style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                                </div>
                                            </MDBCol>
                                            <MDBCol className="content-wallet" md='10'>
                                                <MDBCardText>{selectedWallet.name}</MDBCardText>
                                                <MDBCardText style={{fontWeight:'600'}}>{selectedWallet.balance.toLocaleString()} VNĐ</MDBCardText>
                                            </MDBCol>
                                            <hr/>
                                        </MDBRow>
                                        <MDBRow className="wallet-infomation">
                                            <MDBCol md='2'>
                                                <div className="wallet-icon"><FaUserTie/></div>
                                            </MDBCol>
                                            <MDBCol className="content-wallet" md='10'>
                                                <MDBCardText>USER</MDBCardText>
                                                <MDBCardText>{user.username}</MDBCardText>
                                                <MDBCardText>{user.email}</MDBCardText>
                                            </MDBCol>
                                            <hr/>
                                            <MDBRow className="wallet-infomation">
                                                <MDBCol md='2'>
                                                    <div className="wallet-icon"><FaUserCheck /></div>
                                                </MDBCol>
                                                <MDBCol className="content-wallet" md='10'>
                                                    <MDBCardText>Member</MDBCardText>
                                                    <div className="face-member">
                                                        <BiSolidHappy />
                                                        <RiEmotionHappyLine />
                                                        <BiSolidHappyHeartEyes />
                                                        <TbMoodHappy />
                                                        <TbMoodCrazyHappy />
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className="wallet-share" onClick={handleShare}>
                                                <MDBCol md='12' style={{margin:'0 0 30px 80px'}}>
                                                    <WrapItem><Button colorScheme='messenger'>Invite</Button></WrapItem>
                                                </MDBCol>
                                                <hr/>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol>
                                                    <button className="btn-update" onClick={() => handleShow(selectedWallet.id)}> Update</button>
                                                </MDBCol>
                                                <MDBCol>
                                                    {wallets.length > 1 && (
                                                        <button className="btn-delete"
                                                                onClick={() => handleDelete(selectedWallet.id)}>
                                                            <svg viewBox="0 0 448 512" className="svgIcon">
                                                                <path
                                                                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                                            </svg>
                                                        </button>
                                                    )}
                                                </MDBCol>
                                            </MDBRow>

                                        </MDBRow>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        )}
                    </div>

                    {/*Wallet share detail*/}
                    <div className={`card2 ${selectedShareWallet ? 'selectedShare' : ''}`}>
                        {showCardShare && (
                            <MDBCard>
                                <div className="btn-x" onClick={handleClickX}>
                                    <MdOutlineClose/>
                                </div>
                                <MDBCardBody>
                                    <MDBRow style={{textAlign: 'center'}}>
                                        <MDBCardTitle style={{margin: '-15px 0 30px 0'}}>WALLET DETAILS <hr/></MDBCardTitle>

                                        <MDBRow className="wallet-infomation">
                                            <MDBCol md='2'>
                                                <div className="wallet-icon">
                                                    <img src="https://static.moneylover.me/img/icon/icon.png"
                                                         alt="Wallet Icon"
                                                         style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                                </div>
                                            </MDBCol>
                                            <MDBCol className="content-wallet" md='10'>
                                                <MDBCardText>{selectedShareWallet.name}</MDBCardText>
                                                <MDBCardText style={{fontWeight:'600'}}>{selectedShareWallet.balance.toLocaleString()} vnđ</MDBCardText>
                                            </MDBCol>
                                            <hr/>
                                        </MDBRow>
                                        <MDBRow className="wallet-infomation">
                                            <MDBCol md='2'>
                                                <div className="wallet-icon"><FaUserTie/></div>
                                            </MDBCol>
                                            <MDBCol className="content-wallet" md='10'>
                                                <MDBCardText>OWNER</MDBCardText>
                                                <MDBCardText>{owner.username}</MDBCardText>
                                                <MDBCardText>{owner.email}</MDBCardText>
                                            </MDBCol>
                                            <hr/>
                                            <MDBRow className="wallet-infomation">
                                                <MDBCol md='2'>
                                                    <div className="wallet-icon"><FaUserCheck /></div>
                                                </MDBCol>
                                                <MDBCol className="content-wallet" md='10'>
                                                    <MDBCardText>Member</MDBCardText>
                                                    <div className="face-member">
                                                        <BiSolidHappy />
                                                        <RiEmotionHappyLine />
                                                        <BiSolidHappyHeartEyes />
                                                        <TbMoodHappy />
                                                        <TbMoodCrazyHappy />
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                            {role === "USABLE" ? (
                                                <MDBRow>
                                                    <MDBCol>
                                                        <button className="btn-update" onClick={() => handleShowShare(selectedShareWallet)}> Update</button>
                                                    </MDBCol>
                                                </MDBRow>
                                            ):(
                                                <MDBRow>
                                                </MDBRow>
                                            )}
                                        </MDBRow>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        )}
                    </div>
                </MDBContainer>
            </div>

            {/*modal create wallet*/}
            <Modal show={showC} onHide={handleCloseC}>
                <Form onSubmit={handleSubmitC}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Wallet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name Wallet</Form.Label>
                            <Form.Control type="text" placeholder="Enter name"
                                          name='name'
                                          onChange={(e) =>
                                              setWallet({...wallet, [e.target.name]: e.target.value})
                                          }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Balance</Form.Label>
                            <Form.Control type="number" placeholder="Enter Banlance"
                                          name='balance'
                                          onChange={(e) =>
                                              setWallet({...wallet, [e.target.name]: e.target.value})
                                          }
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseC}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/*form modal update wallet*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Wallet Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>Name Wallet</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Name Wallet"
                                          name="name"
                                          value={editWallet.name}
                                          onChange={(e) => setEditWallet({
                                              ...editWallet,
                                              name: e.target.value
                                          })}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupBalance">
                            <Form.Label>Total Money</Form.Label>
                            <Form.Control type="number"
                                          name="balance"
                                          placeholder="Money"
                                          value={editWallet.balance}
                                          onChange={(e) => setEditWallet({
                                              ...editWallet,
                                              balance: e.target.value
                                          })}/>
                        </Form.Group>
                        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                            <Button variant="success" onClick={handleUpdate}>Update</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/*form more money*/}
            <Modal show={showM} onHide={handleCloseM}>
                <Modal.Body>
                    <Form onSubmit={handleSubmitM}>
                        <Modal.Header closeButton>
                            <Modal.Title>More Money</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{flex: '1'}}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Money</Form.Label>
                                    <Form.Control type="number" placeholder="Enter money" name='money'/>
                                </Form.Group>
                            </div>
                            <div>
                                <img
                                    src="https://img.freepik.com/premium-vector/sack-money-big-pile-cash-money-icon-illustration-money-bag-flat-icon_385450-362.jpg"
                                    style={{width: '100px', height: '100px'}}/>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseM}>
                                Close
                            </Button>
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            {/*form show share*/}
            <Modal show={showShare} onHide={closeShare}>
                <Modal.Body>
                    <Form onSubmit={handleShareWallet}>
                        <Modal.Header closeButton>
                            <Modal.Title>Share wallet</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <MDBRow className="share-email">
                                <MDBCol md='2' className='btn-share-email'><IoMail /></MDBCol>
                                <MDBCol md='8'><Input placeholder='Email' name='email' onChange={handleEmail}></Input></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md='2' className='btn-share-message'><BsChatLeftTextFill /></MDBCol>
                                <MDBCol md='8'>
                                    <Select name='category_type' className="form-select" aria-label="Default select example" value={role} onChange={handleRoleChange}>
                                        <option value='all'>---Select role---</option>
                                        <option value='USABLE'>USABLE</option>
                                        <option value='READABLE'>READABLE</option>
                                    </Select>
                                </MDBCol>
                            </MDBRow>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeShare}>
                                Close
                            </Button>
                            <Button variant="success" type="submit">
                                Share
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
};
export default Wallet;