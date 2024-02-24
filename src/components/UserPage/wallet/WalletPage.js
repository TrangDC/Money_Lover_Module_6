import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate, useParams} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import { CiWallet } from "react-icons/ci";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Input, useDisclosure,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'

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

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSubmitC = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/wallets/saveWallet', wallet)
            .then(res => {
                console.log(res);
                navigate("/auth/wallets")
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
                navigate("/auth/wallets")
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
                    navigate("/auth/wallets")
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


    return (
        <>
            <div className="flex flex-col gap-4">
                <Navbar className="bg-body-tertiary justify-content-between">

                    <h4 className="my-2" style={{marginLeft: '30px'}}>
                        My Wallet
                    </h4>
                    <Button variant="secondary" style={{marginLeft: 'auto'}} className="m-2" onClick={onOpen}>Create New Wallet</Button>

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
                            width: '400px',
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
                            <Link  className="text-dark" onClick={() => handleShow(wallet.id)}>
                                <tr style={{ backgroundColor: 'white', border: '1px solid silver', height: '40px' }}>
                                    <td style={{ verticalAlign: 'top' }}>
                                        <CiWallet style={{ width: '40px', height: '40px', marginTop: '10px' }} />
                                    </td>
                                    <td style={{ width: '395px', marginTop: '-30px', verticalAlign: 'top' }}>
                                        <div>
                                            <p>{wallet.name}</p>
                                            <p>+ {wallet.balance} đ</p>
                                        </div>
                                    </td>
                                </tr>
                            </Link>
                        ))}
                        </tbody>
                    </Table>

                    <div>
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
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                        <Button variant="dark" onClick={handleUpdate}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDelete(editWallet.id)}>Delete</Button>
                                    </div>
                                </Form>
                            </Offcanvas.Body>

                        </Offcanvas>
                    </div>

                    <Modal isOpen={isOpen} onClose={onClose} >
                        <ModalOverlay />
                        <ModalContent>
                            <form onSubmit={handleSubmitC}>
                                <ModalHeader>CREATE WALLET</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl isRequired>
                                        <FormLabel>Name Wallet</FormLabel>
                                        <Input name='name'
                                               className='form-control'
                                               onChange={(e) =>
                                                   setWallet({ ...wallet, [e.target.name]: e.target.value })
                                               }
                                               type="text" placeholder="Enter name" />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Blance</FormLabel>
                                        <Input name='balance'
                                               className='form-control'
                                               onChange={(e) =>
                                                   setWallet({ ...wallet, [e.target.name]: e.target.value })
                                               }
                                               type="number" placeholder="Enter balance" />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} type="submit">
                                        Create
                                    </Button>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                    </Modal>

                </div>

            </div>
        </>
    );
};

export default WalletPage;