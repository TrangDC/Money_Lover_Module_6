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
import { FaUserEdit } from "react-icons/fa";
import { HiMiniWallet } from "react-icons/hi2";
import { BiSolidCategory } from "react-icons/bi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

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

    return (
        <div style={{textAlign: 'center'}}>
            <Container>
                <div style={{textAlign: 'center'}}>
                        <Image src={user.image} className= "mb-3" roundedCircle style={{width: '70px', height: '70px',margin: 'auto'}} />
                        <h5>{user.username}</h5>
                        <h7>{user.email}</h7>
                </div>
            </Container>
            <ListGroup style={{marginTop: '60px',width:'400px',height: '600px',margin: 'auto'}}>
                <ListGroup.Item className="d-flex align-items-center">
                    <Link  onClick={handleShow} className="text-dark d-flex align-items-center">
                        <FaUserEdit className="mx-2 text-green-700" style={{ width: '25px', height: '25px' }} />
                        <span style={{fontWeight: 'bold'}}>Account Management</span>
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"><p></p> </ListGroup.Item>

                <ListGroup.Item className="d-flex align-items-center">
                    <Link to="/auth/wallets" className="text-dark d-flex align-items-center">
                        <HiMiniWallet className="mx-2 text-green-700" style={{ width: '25px', height: '25px' }} />
                        <span style={{fontWeight: 'bold'}}>My Wallet</span>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item variant="secondary"><p></p> </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                    <Link to= "/auth/categories" className="text-dark d-flex align-items-center">
                    <BiSolidCategory  className="mx-2 text-green-700" style={{width: '25px' ,height: '25px'}}/>
                    <span style={{fontWeight: 'bold'}}> Group </span>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item variant="secondary"><p></p></ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                        <Link className="text-dark d-flex align-items-center">
                        <BiLogOut  className="mx-2 text-green-700" style={{width: '25px' ,height: '25px'}}/>
                        <span style={{fontWeight: 'bold'}}>Logout</span>
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
                                <Image src={user.image} roundedCircle style={{width: '60px', height: '60px',margin: 'auto'}} className= "mb-3"/>
                            </Link>
                            <h5>{user.username}</h5>
                            <h7>username@gmail.com</h7>
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