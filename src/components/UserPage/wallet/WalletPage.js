import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import { IoMdArrowRoundBack } from "react-icons/io";
import {Link, useNavigate, useParams} from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import {Card} from "react-bootstrap";

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
    const { id } = useParams();

    //create wallet
    const navigate = useNavigate();

    const handleSubmitC = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/wallets/saveWallet', wallet)
            .then(res => {
                console.log(res);
                navigate('/wallets');
            })
            .catch(err => console.log(err));
    };
//update wallet
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/wallets/${id}`)
            .then((res) => {
                setWallet(res.data);
            })
            .catch((err) => console.error(err));

    }, [id]);
    const handleUpdate = () => {
        axios
            .put(`http://localhost:8080/api/wallets/${selectedWalletId}`, editWallet)
            .then((res) => {
                console.log(res.data);
                handleClose();
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            });
    };
    //xoa wallet
    const handleDelete = (id) => {
        const confirm = window.confirm('Are You Sure ?');
        if (confirm) {
            axios.delete(`http://localhost:8080/api/wallets/deleteWallet/${selectedWalletId}`)
                .then(res => {
                    alert("Success !");
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    };
//hien thi danh sach
    useEffect(() => {
        axios.get('http://localhost:8080/api/wallets')
            .then(res => {
                console.log(res);
                setWallets(res.data);
            })
            .catch(err => console.error(err))
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();

        if (searchTerm) {
            axios.get(`http://localhost:8080/api/wallets/searchWallet?nameWallet=${searchTerm}`)
                .then(res => {
                    console.log(res);
                    setWallets(res.data);
                })
                .catch(err => console.error(err));
        } else {
            axios.get('http://localhost:8080/api/wallets')
                .then(res => {
                    console.log(res);
                    setWallets(res.data);
                })
                .catch(err => console.error(err));
        }
    };

    const [showC, setShowC] = useState(false);

    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);


    return (
        <>
            <div className="flex flex-col gap-4">
                <Navbar className="bg-body-tertiary justify-content-between">

                    <h4 className="my-2" style={{marginLeft: '30px'}}>
                        My Wallet
                    </h4>
                        <Button variant="secondary" style={{marginLeft: 'auto'}} className="m-2" onClick={handleShowC}>Create New Wallet</Button>

                    <Form onSubmit={handleSearch}  style={{marginTop: '15px'}}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}

                                placeholder="Search Wallet"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <Button type="submit" variant="secondary" id="button-addon2">
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
                                width: '450px',
                            }}
                        >
                            <tbody>
                            <tr>
                                <td colSpan={2} style={{
                                    backgroundColor: '#EEEEEE',
                                    fontSize: '14px',
                                    fontWeight: 'normal',
                                }}>
                                    <p style={{marginBottom: 0}}>Excluded from Total</p>
                                </td>
                            </tr>
                            {wallets.map((wallet) => (
                                <tr style={{ backgroundColor: 'white',  border: '1px solid silver', }}>
                                    <Link  className="text-dark" onClick={() => handleShow(wallet.id)}>
                                        <td style={{ width: '5px' }}>
                                            <Image
                                                style={{
                                                    textAlign: 'center',
                                                    marginRight: '10px',
                                                    marginBottom: '-5px',
                                                    marginTop: '5px',
                                                    width: '50px',
                                                    height: '50px'
                                                }}
                                                src="https://firebasestorage.googleapis.com/v0/b/fir-2c9ce.appspot.com/o/583985.png?alt=media&token=c15df242-a33a-4448-baa2-26488f28eff3"
                                                roundedCircle
                                            />
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <p style={{ margin: 0 }}>{wallet.name}</p>
                                                <p style={{ margin: 0 }}>+ {wallet.balance} đ</p>
                                            </div>
                                        </td>
                                    </Link>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                    <Offcanvas show={show} onHide={handleClose} backdrop="static">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Wallet Details</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label>Name Wallet</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Name Wallet"
                                                  name="name"
                                                  value={editWallet.name}
                                                  onChange={(e) => setEditWallet({ ...editWallet, name: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupBalance">
                                    <Form.Label>Total Money</Form.Label>
                                    <Form.Control type="number"
                                                  name="balance"
                                                  placeholder="Money"
                                                  value={editWallet.balance}
                                                  onChange={(e) => setEditWallet({ ...editWallet, balance: e.target.value })} />
                                </Form.Group>
                                <Button variant="dark" onClick={handleUpdate}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(editWallet.id)}>Delete</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Offcanvas>

                    <Modal show={showC} onHide={handleCloseC}>
                        <Modal.Header closeButton>

                        </Modal.Header>
                        <Modal.Body>
                            <Card style={{maxWidth: '400px',margin: 'auto',backgroundColor: '#EEEEEE'}}>
                                <Card.Header style={{margin: 'auto',fontWeight: 'bold'}}><h3>Create Wallet </h3> </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <Form style={{textAlign: 'center'}} onSubmit={handleSubmitC}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Name Wallet</Form.Label>
                                                <Form.Control name='name'
                                                              className='form-control'
                                                              onChange={(event) =>
                                                                  setWallet({ ...wallet, [event.target.name]: event.target.value })
                                                              }
                                                              type="text" placeholder="Enter name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Balance</Form.Label>
                                                <Form.Control  name='balance'
                                                               className='form-control'
                                                               onChange={(event) =>
                                                                   setWallet({ ...wallet, [event.target.name]: event.target.value })
                                                               }
                                                               type="number" placeholder="Enter balance" />
                                            </Form.Group>

                                        </Form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseC}>
                                Close
                            </Button>
                            <Button variant="light" type="submit">
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>

            </div>
        </>
    );
};

export default WalletPage;