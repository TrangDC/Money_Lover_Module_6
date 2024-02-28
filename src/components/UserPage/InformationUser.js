import React, {useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { BsPersonFill } from "react-icons/bs";
import {MDBInput, MDBTypography} from 'mdb-react-ui-kit';
import {IoMdArrowRoundBack, IoMdWallet} from "react-icons/io";
import { FaLayerGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import {Link, useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Upimage from "../FireBase/Upimage";

import axios from "axios";
import {useToast} from "@chakra-ui/react";
import {FaUserEdit} from "react-icons/fa";
import {HiMiniWallet} from "react-icons/hi2";


const InformationUser = () => {
    const [show, setShow] = useState(false);
    const [showImg, setShowImg] = useState(false);



    const [editUser, setEditUser] = useState({
        email: "",
        name: "",
        username: ""
    })
    const [user, setUser] = useState({})


    const handleShowImg = () => setShowImg(true);
    const showImgClose = () => setShowImg(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toast = useToast();
    const handleSubmit = () => {
        axios
            .put('http://localhost:8080/api/users/' + users.id, editUser)
            .then(res => {
                toast({
                    title: 'Update success!',
                    description: 'You successfully update a information!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
                setTimeout(() => {
                    handleClose();
                }, 1000);
            }).catch(err => {
                toast({
                    title: 'Update Failed',
                    description: 'Error: Email is already in use!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            })
    }

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
                const userData = res.data;
                setEditUser({
                    email: userData.email,
                    name: userData.name,
                    username: userData.username
                });
                setImage(res.data.image);
            })
            .catch(err => console.error(err))
    }, [users.id])

    return (
        <div style={{textAlign: 'center'}}>
            <Container>
                <div style={{textAlign: 'center'}}>
                    <Image src={images} className= "mb-3" roundedCircle style={{width: '70px', height: '70px',margin: 'auto'}} />
                    <h5>{editUser.username}</h5>
                    <h7>{editUser.email}</h7>
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


            <div onClick={handleShow}>
                Account Management
            </div>


            {/*------new edit user-------------*/}
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                size="lg"
                style={{height: "600px"}}
            >
                <div className="flex ">
                    <div className="flex-1">
                        <img style={{marginTop: "130px"}} className="justify-center align-items-center" src="https://firebasestorage.googleapis.com/v0/b/upload-img-76277.appspot.com/o/images%2Fstatic%2F1200x630wa.png?alt=media&token=dce9577a-5ee2-416c-ad05-dde82e371407" alt=""/>
                    </div>
                    <div className="flex-1 w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Update User
                        </h2>
                        <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <MDBInput label='Enter email' id='form1' type='text'
                                          value={editUser.email} name='email'
                                          onChange={(event) => {
                                              setEditUser({...editUser, [event.target.name]: event.target.value})
                                          }}
                                />

                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Name
                                </label>
                                <MDBInput label='Enter name' id='form1' type='text'
                                          value={editUser.name} name='name'
                                          onChange={(event) => {
                                              setEditUser({
                                                  ...editUser,
                                                  [event.target.name]: event.target.value
                                              })
                                          }}
                                />

                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    User Name
                                </label>
                                <MDBInput label='User Name' id='form1' type='text'
                                          value={editUser.username} name='username'
                                          onChange={(event) => {
                                              setEditUser({
                                                  ...editUser,
                                                  [event.target.name]: event.target.value
                                              })
                                          }}
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="newsletter"
                                        aria-describedby="newsletter"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="newsletter"
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{" "}
                                        <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn btn-success w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"

                            >
                                Submit
                            </Button>
                            <Button
                                onClick={handleClose}
                                className="btn btn-success w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Cancel
                            </Button>

                        </div>
                    </div>

                </div>
            </Modal>
{/*-------------- upload img -----------------*/}
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
