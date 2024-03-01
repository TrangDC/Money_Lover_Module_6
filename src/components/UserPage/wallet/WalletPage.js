import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate, useParams} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import {useToast} from "@chakra-ui/react";
import {GiWallet} from "react-icons/gi";
import {FaPiggyBank} from "react-icons/fa6";
import {GiPiggyBank} from "react-icons/gi";
import {MdCreateNewFolder} from "react-icons/md";

const WalletPage = () => {
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (walletId) => {
        setSelectedWalletId(walletId);
        setShow(true);
        const selectedWallet = wallets.find(wallet => wallet.id === walletId);
        setEditWallet(selectedWallet);
    };

    const [wallets, setWallets] = useState([]);
    const [wallet, setWallet] = useState({
        name: '',
        balance: ''
    });
    const [editWallet, setEditWallet] = useState({
        name: '',
        balance: ''
    });
    const [selectedWalletId, setSelectedWalletId] = useState(null);
    const toast = useToast()

    const navigate = useNavigate();
    const [user, setUser] = useState({})
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

    const handleUpdate = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:8080/api/wallets/user/${user.id}/edit/${selectedWalletId}`, editWallet)
            .then((res) => {
                console.log(res.data);
                handleClose();
                navigate("/auth/wallets")
                fetchWallets(user);
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


    const handleDelete = (id) => {
        const confirm = window.confirm('Are You Sure ?');
        if (confirm) {
            axios.delete(`http://localhost:8080/api/wallets/user/${user.id}/delete/${selectedWalletId}`)
                .then(res => {
                    navigate("/auth/wallets")
                    handleClose();
                    fetchWallets(user);
                    toast({
                        title: 'Delete Successful',
                        description: 'You successfully deleted your wallet!',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                    });
                })
                .catch(err => toast({
                    title: 'Delete Failed',
                    description: 'You failed to delete your wallet!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                }));
        }
    };

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"));
        console.log(userdata);
        setUser(userdata)
        fetchWallets(userdata);
    }, [wallet]);

    const handleSearch = (event) => {
        // event.preventDefault();
        //
        // if (searchTerm) {
        //     axios.get(`http://localhost:8080/api/wallets/searchWallet?nameWallet=${searchTerm}`)
        //         .then(res => {
        //             console.log(res);
        //             setWallets(res.data);
        //         })
        //         .catch(err => console.error(err));
        // } else {
        //     axios.get('http://localhost:8080/api/wallets')
        //         .then(res => {
        //             console.log(res);
        //             setWallets(res.data);
        //         })
        //         .catch(err => console.error(err));
        // }
    };
    const fetchWallets = (userdata) => {
        axios.get('http://localhost:8080/api/users/' + userdata.id)
            .then((res) => {
                console.log(res.data);

                window.localStorage.setItem("wallets", JSON.stringify(res.data.wallets));
                const wallets = JSON.parse(localStorage.getItem("wallets"));
                setWallets(wallets);
            })
            .catch((err) => console.error(err));
    };

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
        // axios.put(`http://localhost:8080/api/wallets/${selectedWalletId}/add-money`, {money: money})
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
        <>
            <div className="flex flex-col gap-4">
                <Navbar className="bg-body-tertiary justify-content-between">

                    <h4 className="my-2" style={{display: 'flex', alignItems: 'center', marginLeft: '30px'}}>
                        <GiWallet style={{marginRight: '10px', width: '40px', height: '40px'}}
                                  className="text-green-400"/>
                        My Wallet
                    </h4>
                    <MdCreateNewFolder onClick={handleShowC}
                                       style={{width: '40px', height: '40px', marginRight: '-360px'}}
                                       className="text-green-400"/>
                    <Form onSubmit={handleSearch} style={{marginTop: '15px'}}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}

                                placeholder="Search Wallet"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <Button type="submit" variant="success" id="button-addon2">
                                Search
                            </Button>
                        </InputGroup>
                    </Form>

                </Navbar>
                <div className="flex flex-row w-full"
                     style={{
                         backgroundColor: '#DDDDDD',
                         height: 'auto'
                     }}
                >
                    <Table
                        style={{
                            marginTop: '60px',
                            margin: 'auto',
                            width: '400px',
                        }}
                    >
                        <tbody>
                        <tr>
                            <td colSpan={3} style={{
                                backgroundColor: '#EEEEEE',
                                fontSize: '14px',
                                fontWeight: 'normal',
                            }}>
                                <p style={{marginBottom: 0}}>Excluded from Total</p>
                            </td>
                        </tr>
                        {wallets.map((wallet) => (
                            <tr style={{backgroundColor: 'white', border: '1px solid silver', height: '40px'}}>
                                <Link className="text-dark" onClick={() => handleShow(wallet.id)}
                                      style={{display: 'flex', alignItems: 'center'}}>
                                    <td className="rounded-full h-13 w-13 bg-green-500 flex items-center ">
                                        <FaPiggyBank style={{width: '40px', height: '40px'}} className="text-white"/>
                                    </td>
                                    <td style={{width: 'calc(100% - 70px)', verticalAlign: 'middle'}}>
                                        <div>
                                            <p>{wallet.name}</p>
                                            <p>+ {wallet.balance} đ</p>
                                        </div>
                                    </td>
                                </Link>
                                <td style={{verticalAlign: 'middle'}}>
                                    <GiPiggyBank onClick={() => handleShowM(wallet.id)}
                                                 style={{width: '40px', height: '40px'}}
                                                 className="text-green-400"/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

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
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    {wallets.length > 1 && (
                                        <Button variant="danger" onClick={() => handleDelete(editWallet.id)}>Delete</Button>
                                    )}
                                    <Button variant="success" onClick={handleUpdate}>Edit</Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>

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
            </div>
        </>
    );
};

export default WalletPage;