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
    const handleShow = (walletId) => {
        setSelectedWalletId(walletId);
        setShow(true);
        // Lấy giá trị của wallet được chọn từ danh sách wallets
        const selectedWallet = wallets.find(wallet => wallet.id === walletId);
        // Gán giá trị name và balance của wallet vào state editWallet
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
    const navigate = useNavigate();
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
                handleClose(); // Đóng modal sau khi cập nhật thành công
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

                <Link to="/" className="text-dark" >
                    <IoMdArrowRoundBack className="my-2" style={{marginLeft: '100px', width: '30px', height: '30px' }} />
                </Link>
                <h4 className="my-2" style={{marginRight: 'auto'}}>
                    Create Wallet
                </h4>
                <Link to='/user/createWallet'>
                    <Button variant="secondary" style={{marginLeft: 'auto'}} className="m-2">Create New Wallet</Button>

                </Link>
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

            <div
                style={{
                    backgroundColor: '#DDDDDD',
                    width: '1400px',
                    height: '700px'
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Table
                        style={{
                            marginTop: '60px',
                            width: '500px',
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
                </div>

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

            </div>
        </>
    );
};

export default WalletPage;