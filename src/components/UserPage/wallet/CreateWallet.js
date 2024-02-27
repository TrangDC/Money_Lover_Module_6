import React, {useEffect, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import {Card} from "react-bootstrap";

const CreateWallet = () => {
    //create wallet
    const [wallet, setWallet] = useState({
        name: '',
        balance: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/wallets/saveWallet', wallet)
            .then(res => {
                console.log(res);
                navigate('/user/wallet');
            })
            .catch(err => console.log(err));
    };
    return (
        <div>
            <Navbar className="bg-body-tertiary justify-content-between">

                <Link to="/user/wallet" className="text-dark" >
                    <IoMdArrowRoundBack className="my-2" style={{marginLeft: '100px', width: '30px', height: '30px' }} />
                </Link>
                <h4 className="my-2" style={{marginRight: 'auto'}}>
                    My Wallet
                </h4>
            </Navbar>

            <div  style={{
                backgroundColor: '#DDDDDD',
                width: '1400px',
                height: '1000px'
            }}>

                <Card style={{maxWidth: '400px',margin: 'auto',backgroundColor: '#EEEEEE'}}>
                    <Card.Header style={{margin: 'auto',fontWeight: 'bold'}}><h3>Create Wallet </h3> </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Form style={{textAlign: 'center'}} onSubmit={handleSubmit}>
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
                                <Button variant="light" type="submit">
                                    Create
                                </Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default CreateWallet;