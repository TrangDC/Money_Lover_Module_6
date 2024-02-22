import React from 'react';
import { useState } from 'react';
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


const WalletPage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>

                <Navbar className="bg-body-tertiary justify-content-between">
                    <Link to="/user" className="text-dark" >
                        <IoMdArrowRoundBack className="mx-2 mb-2 my-2" style={{ width: '30px', height: '30px' }} />
                    </Link>
                    <h4 style={{marginLeft: '-350px'}} className= "mb-2">
                        My Wallet
                    </h4>
                    <Button variant="success">Create Wallet New</Button>{' '}

                    <Form inline>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search Wallet"
                                    className=" mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Navbar>

                <div
                    style={{
                        backgroundColor: '#DDDDDD',
                        width: '1400px',
                        height: '1000px'
                    }}
                >
                    <div style={{display: 'flex',
                        justifyContent: 'center',
                        }}>
                        <Table
                            style={{ marginTop: '100px',
                                width: '500px'
                            }}
                        >
                            <tr>
                                <td colSpan={2} style={{backgroundColor: '#EEEEEE',
                                    fontSize: '14px',
                                    fontWeight: 'normal',
                                    }}>
                                    <p >Excluded from Total </p>
                                </td>
                            </tr>

                            <tr style={{ backgroundColor: 'white' }}>
                                <Link className="text-dark" onClick={handleShow}>
                                    <td style={{width: '5px'}}>
                                    <Image
                                        style={{ textAlign: 'center', marginRight: '10px', marginBottom: '5px', width: '80px', height: '80px' }}
                                        src="https://firebasestorage.googleapis.com/v0/b/fir-2c9ce.appspot.com/o/583985.png?alt=media&token=c15df242-a33a-4448-baa2-26488f28eff3"
                                        roundedCircle
                                    />
                                </td>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p style={{ margin: 0 }}>Name Wallet</p>
                                        <p style={{ margin: 0 }}>+500,000,000.00 ₫</p>
                                    </div>
                                </td>
                                    </Link>
                            </tr>

                        </Table>

                    </div>


                <Offcanvas show={show} onHide={handleClose} backdrop="static">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Wallet details</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Name Wallet</Form.Label>
                                <Form.Control type="text" placeholder="Name Wallet" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
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