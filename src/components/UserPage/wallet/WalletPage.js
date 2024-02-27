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
    ModalCloseButton, Input, useDisclosure, useToast, transform,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import { GiWallet } from "react-icons/gi";

const WalletPage = () => {
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (walletId) => {
        onOpen(onOpenE);
        setSelectedWalletId(walletId);
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
    const toast = useToast()
    //create wallet
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSubmitC = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/wallets/saveWallet', wallet)
            .then(res => {
                console.log(res);
                navigate("/auth/wallets")
                onClose();
                fetchWallets();
                toast({
                    title: 'Create success!',
                    description: 'You successfully created a wallet!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
            })
            .catch(err => toast({
                title: 'Create Failed',
                description: 'You successfully created a wallet!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            }));
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
                fetchWallets();
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
    //xoa wallet
    const handleDelete = (id) => {
        const confirm = window.confirm('Are You Sure ?');
        if (confirm) {
            axios.delete(`http://localhost:8080/api/wallets/deleteWallet/${selectedWalletId}`)
                .then(res => {
                    navigate("/auth/wallets")
                    handleClose();
                    fetchWallets();
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
//hien thi danh sach
    useEffect(() => {
        const userdata = localStorage.getItem("user");
        console.log(JSON.parse(userdata));
        setUser(JSON.parse(userdata))
        fetchWallets();
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
    const fetchWallets = () => {
        axios
            .get(`http://localhost:8080/api/wallets`)
            .then((res) => {
                console.log(res);
                setWallets(res.data);
            })
            .catch((err) => console.error(err));
    };

    //Modal edit wallet
    const { isOpenE, onOpenE, onCloseE } = useDisclosure()

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
                                    <td className="rounded-full h-12 w-12 flex items-center bg-green-500" style={{marginTop: '18px',marginLeft: '10px'}}>
                                        <GiWallet style={{ width: '50px', height: '50px'}} className="text-yellow-400" />
                                    </td>
                                    <td style={{ width: '395px', verticalAlign: 'top' }}>
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
            {/*form edit*/}
            {/*        <div>*/}
            {/*            <Offcanvas show={show} onHide={handleClose} backdrop="static">*/}
            {/*                <Offcanvas.Header closeButton>*/}
            {/*                    <Offcanvas.Title>Wallet Details</Offcanvas.Title>*/}
            {/*                </Offcanvas.Header>*/}
            {/*                <Offcanvas.Body>*/}
            {/*                    <Form>*/}
            {/*                        <Form.Group className="mb-3" controlId="formGroupName">*/}
            {/*                            <Form.Label>Name Wallet</Form.Label>*/}
            {/*                            <Form.Control type="text"*/}
            {/*                                          placeholder="Name Wallet"*/}
            {/*                                          name="name"*/}
            {/*                                          value={editWallet.name}*/}
            {/*                                          onChange={(e) => setEditWallet({ ...editWallet, name: e.target.value })} />*/}
            {/*                        </Form.Group>*/}
            {/*                        <Form.Group className="mb-3" controlId="formGroupBalance">*/}
            {/*                            <Form.Label>Total Money</Form.Label>*/}
            {/*                            <Form.Control type="number"*/}
            {/*                                          name="balance"*/}
            {/*                                          placeholder="Money"*/}
            {/*                                          value={editWallet.balance}*/}
            {/*                                          onChange={(e) => setEditWallet({ ...editWallet, balance: e.target.value })} />*/}
            {/*                        </Form.Group>*/}
            {/*                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>*/}
            {/*                            <Button variant="dark" onClick={handleUpdate}>Edit</Button>*/}
            {/*                            <Button variant="danger" onClick={() => handleDelete(editWallet.id)}>Delete</Button>*/}
            {/*                        </div>*/}
            {/*                    </Form>*/}
            {/*                </Offcanvas.Body>*/}

            {/*            </Offcanvas>*/}
            {/*        </div>*/}
            {/*thay bang modal*/}
                    <Modal isOpen={isOpenE} onClose={onCloseE}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>

                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onCloseE}>
                                    Close
                                </Button>
                                <Button variant='ghost'>Secondary Action</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>



                    {/*form create*/}
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