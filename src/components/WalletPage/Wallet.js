import React, {useEffect, useState} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, MDBRow, MDBCol, MDBContainer
} from 'mdb-react-ui-kit';
import "./Wallet.css"
import {useNavigate} from "react-router-dom";
import {FaUserTie, FaWallet} from "react-icons/fa";
import {MdOutlineClose} from "react-icons/md";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useToast} from "@chakra-ui/react";
import {GiPiggyBank} from "react-icons/gi";

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
            axios.delete(`http://localhost:8080/api/wallets/user/${user.id}/delete/${id}`)
                .then(res => {
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
    const handleUpdate = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:8080/api/wallets/user/${user.id}/edit/${selectedWalletId}`, editWallet)
            .then((res) => {
                console.log(res.data);
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

    const handleShowM = (walletId) => {
        setSelectedWalletId(walletId);
        setShowM(true);
        const selectedWallet = wallets.find(wallet => wallet.id === walletId);
        setEditWallet(selectedWallet);
    };

    const handleSubmitM = (event) => {
        event.preventDefault();
        const money = parseFloat(event.target.money.value);
        axios.put(`http://localhost:8080/api/wallets/user/${user.id}/add_money/${selectedWalletId}/${money}`, {money: money})
            .then((res) => {
                console.log(res.data);
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

    return (
        <div>
            <div className="container">

                <MDBContainer className={`container-wallet ${selectedWallet ? 'selected' : ''}`}>

                    <div className={`wallets ${selectedWallet ? 'selected' : ''}`}>
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
                        <MDBCard style={{borderRadius: "10px"}}>
                            <MDBCardBody style={{backgroundColor: "#f6f3f3",borderRadius: '10px'}}>
                                <MDBCardTitle>Wallets</MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>
                        <div style={{overflowY: 'auto', maxHeight: '600px'}}>
                            {wallets.map(wallet => (
                                <MDBCard className={`card1 ${selectedWallet ? 'selected' : ''}`}>
                                    <MDBCardBody className="card-body">
                                        <MDBRow className="wallet">
                                            <MDBCol md='2' onClick={() => handleWalletClick(wallet)}>
                                                <div className="wallet-icon">
                                                    <FaWallet/>
                                                </div>
                                            </MDBCol>
                                            <MDBCol className="content-wallet" md='8'
                                                    onClick={() => handleWalletClick(wallet)}>
                                                <MDBCardText>
                                                    {wallet.name}
                                                </MDBCardText>
                                                <MDBCardText>
                                                    {wallet.balance} vnđ
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
                    </div>
                    <div className={`card2 ${selectedWallet ? 'selected' : ''}`}>
                        {showCard2 && (
                            <MDBCard>
                                <div className="btn-x" onClick={handleClickX}>
                                    <MdOutlineClose/>
                                </div>
                                <MDBCardBody>
                                    <MDBRow style={{textAlign: 'center'}}>
                                        <MDBCardTitle style={{marginTop: '-10%'}}>WALLET DETAILS</MDBCardTitle>
                                        <hr/>
                                        <MDBRow className="wallet-infomation">
                                            <MDBCol md='2'>
                                                <div className="wallet-icon">
                                                    <FaWallet/>
                                                </div>
                                            </MDBCol>
                                            <MDBCol className="content-wallet" md='10'>
                                                <MDBCardText>
                                                    {selectedWallet.name}
                                                </MDBCardText>
                                                <MDBCardText>
                                                    {selectedWallet.balance} vnđ
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr/>
                                        <MDBRow className="wallet-infomation">
                                            <MDBCol md='2'>
                                                <div className="wallet-icon">
                                                    <FaUserTie/>
                                                </div>
                                            </MDBCol>
                                            <MDBCol className="content-wallet" md='10'>
                                                <MDBCardText>
                                                    USER
                                                </MDBCardText>
                                                <MDBCardText>
                                                    {user.username}
                                                </MDBCardText>
                                                <MDBCardText>
                                                    {user.email}
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol>
                                                <button className="btn-update"
                                                        onClick={() => handleShow(selectedWallet.id)}> Update
                                                </button>
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

        </div>
    );
};
export default Wallet;