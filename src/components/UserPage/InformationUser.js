import React, {useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { BsPersonFill } from "react-icons/bs";
import { MDBTypography } from 'mdb-react-ui-kit';
import { IoMdWallet } from "react-icons/io";
import { FaLayerGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import ManagerUserPage from "./ManagerUserPage";

const InformationUser = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <div>

            <Container>
                <div>
                    <Image src="https://w.wallhaven.cc/full/m3/wallhaven-m3vp7y.jpg" roundedCircle style={{marginTop: '50px',marginLeft: '530px',width: '70px', height: '70px'}} />
                    <h5 style={{marginTop: '7px',marginLeft: '515px'}}>User Name</h5>
                    <h7 style={{marginTop: '10px',marginLeft: '490px'}}>username@gmail.com</h7>
                </div>
            </Container>
            <ListGroup style={{marginTop: '45px'}}>
                <ListGroup.Item>
                    <Link onClick={handleShow} className="text-dark">
                        <MDBTypography>
                            <BsPersonFill className = "mx-2 mb-2" style={{width: '30px' ,height: '30px'}}/>
                            <MDBTypography tag='strong'>Account Management</MDBTypography>
                        </MDBTypography>
                    </Link>

                </ListGroup.Item>

                <ListGroup.Item variant="secondary">  <p></p> </ListGroup.Item>

                <ListGroup.Item>
                    <IoMdWallet className = "mx-2 mb-1" style={{width: '25px' ,height: '25px'}} />
                    My Wallet
                </ListGroup.Item>

                <ListGroup.Item>
                    <FaLayerGroup  className = "mx-2 mb-1" style={{width: '25px' ,height: '25px'}}/>
                    Group
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"><p></p></ListGroup.Item>
                <ListGroup.Item>
                    <LuLogOut  className = "mx-2 mb-1" style={{width: '25px' ,height: '25px'}}/>
                    Logout
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
                        <div>
                            <Image src="https://w.wallhaven.cc/full/m3/wallhaven-m3vp7y.jpg" roundedCircle style={{marginLeft: '195px',width: '60px', height: '60px'}} />
                            <h5 style={{marginLeft: '175px'}}>User Name</h5>
                            <h7 style={{marginLeft: '150px'}}>username@gmail.com</h7>
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

        </div>
    );
};

export default InformationUser;