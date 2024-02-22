import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';

const WalletPage = () => {
    //save wallet : http://localhost:8080/api/wallets/saveWallet
    //show all wallet : http://localhost:8080/api/wallets
    //get wallet : http://localhost:8080/api/wallets/{id}
    //delete wallet : http://localhost:8080/api/wallets/deleteWallet/{id}
    //edit wallet : http://localhost:8080/api/wallets/{id}
    //search wallet : http://localhost:8080/api/wallets/searchWallet


    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [wallets, setWallets] = useState([]);

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
            // Nếu searchTerm không có giá trị, gọi API /users để lấy toàn bộ danh sách người dùng
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
            <Navbar className="bg-body-tertiary justify-content-between">
                <Link to="/user" className="text-dark" >
                    <IoMdArrowRoundBack className="mx-2 mb-2 my-2" style={{ width: '30px', height: '30px' }} />
                </Link>
                <h4 style={{ margin: 'auto' }} className="mb-2">
                    My Wallet
                </h4>
                <Button variant="success">Create New Wallet</Button>

                <Form onSubmit={handleSearch} inline>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}

                            placeholder="Search Wallet"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button type="submit" variant="outline-secondary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>
                </Form>

            </Navbar>

            <div
                style={{
                    backgroundColor: '#DDDDDD',
                    width: '1400px',
                    height: '1000px'
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Table
                        style={{
                            marginTop: '100px',
                            width: '500px'
                        }}
                    >
                        <tbody>
                        <tr>
                            <td colSpan={2} style={{
                                backgroundColor: '#EEEEEE',
                                fontSize: '14px',
                                fontWeight: 'normal',
                            }}>
                                <p>Excluded from Total</p>
                            </td>
                        </tr>
                        {wallets.map((wallet) => (
                            <tr style={{ backgroundColor: 'white' }}>
                                <Link className="text-dark" onClick={handleShow}>
                                    <td style={{ width: '5px' }}>
                                        <Image
                                            style={{
                                                textAlign: 'center',
                                                marginRight: '10px',
                                                marginBottom: '5px',
                                                width: '80px',
                                                height: '80px'
                                            }}
                                            src="https://firebasestorage.googleapis.com/v0/b/fir-2c9ce.appspot.com/o/583985.png?alt=media&token=c15df242-a33a-4448-baa2-26488f28eff3"
                                            roundedCircle
                                        />
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ margin: 0 }}>{wallet.name}</p>
                                            <p style={{ margin: 0 }}>{wallet.balance}</p>
                                        </div>
                                    </td>
                                </Link>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>

                <Offcanvas show={show} onHide={handleClose} backdrop="static">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Wallet Details</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupName">
                                <Form.Label>Name Wallet</Form.Label>
                                <Form.Control type="text" placeholder="Name Wallet" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupBalance">
                                <Form.Label>Total Money</Form.Label>
                                <Form.Control type="number" placeholder="Money" />
                            </Form.Group>
                            <Button variant="dark">Edit</Button>
                            <Button variant="danger">Delete</Button>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
};

export default WalletPage;