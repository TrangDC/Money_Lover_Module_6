import React, {useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { BsPersonFill } from "react-icons/bs";
import { MDBTypography } from 'mdb-react-ui-kit';
import {IoMdArrowRoundBack, IoMdWallet} from "react-icons/io";
import { FaLayerGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import ManagerUserPage from "./ManagerUserPage";
import Upimage from "../FireBase/Upimage";
import axios from "axios";

const InformationUser = () => {
    const [show, setShow] = useState(false);
    const [showImg, setShowImg] = useState(false);

    const handleShowImg = () => setShowImg(true);
    const showImgClose = () => setShowImg(false);

    const [user, setUser] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        const userdata = localStorage.getItem("user");
        console.log(JSON.parse(userdata));
        setUser(JSON.parse(userdata))
    }, []);

    const [images, setImage] = useState("")

    const users = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/' + users.id)
            .then(res => {
                console.log(res.data);
                setImage(res.data.image);
            })
            .catch(err => console.error(err))
    }, )

    return (
        <div>
            <Container>
                <div style={{textAlign: 'center'}}>
                    <Image src={images} className= "mb-3" roundedCircle style={{width: '70px', height: '70px',margin: 'auto'}} />
                    <h5>{user.username}</h5>
                    <h7>{user.email}</h7>
                </div>
            </Container>
            <ListGroup style={{marginTop: '45px'}}>
                <ListGroup.Item className="d-flex align-items-center">
                    <Link onClick={handleShow} className="text-dark d-flex align-items-center">
                        <MDBTypography className="d-flex align-items-center">
                            <BsPersonFill className="mr-2" style={{ width: '30px', height: '30px' }} />
                            <span style={{ fontWeight: 'bold' }} title='strong'>Account Management</span>
                        </MDBTypography>
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"><p></p> </ListGroup.Item>

                <ListGroup.Item className="d-flex align-items-center">
                    <Link to="/auth/wallets" className="text-dark d-flex align-items-center">
                        <IoMdWallet className="mr-2" style={{ width: '25px', height: '25px' }} />
                        <span>My Wallet</span>
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex align-items-center">
                    <Link to= "/auth/categories" className="text-dark d-flex align-items-center">
                        <FaLayerGroup  className="mr-2" style={{width: '25px' ,height: '25px'}}/>
                        <span> Group </span>
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"><p></p></ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                    <Link className="text-dark d-flex align-items-center">
                        <LuLogOut className="mr-2" style={{width: '25px' ,height: '25px'}}/>
                        <span>Logout</span>
                    </Link>
                </ListGroup.Item>

            </ListGroup>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton >
                    <Modal.Title style={{marginLeft: '165px'}} >Edit Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div style={{textAlign: 'center'}}>
                            <Link onClick={handleShowImg}>
                                <Image src={images} roundedCircle style={{margin: 'auto',width: '60px', height: '60px'}} />
                            </Link>
                            <h5 >{user.username}</h5>
                            <h7 >{user.email}</h7>
                        </div>
                    </Container>
                    <ManagerUserPage/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showImg}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Upimage></Upimage>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showImgClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default InformationUser;