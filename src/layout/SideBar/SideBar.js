import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {IoReorderThree} from "react-icons/io5";
import {MdAccountBalanceWallet} from "react-icons/md";
import Image from 'react-bootstrap/Image';
import {FaUserAstronaut} from "react-icons/fa";
import {PiIntersectThreeBold} from "react-icons/pi";
import "./sideBar.css";
import {MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem} from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {BsCalendar2Date} from "react-icons/bs";
import {FaSearch} from "react-icons/fa";
import {GiSheikahEye} from "react-icons/gi";
import {FaCircleQuestion} from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import {FaCartShopping} from "react-icons/fa6";
import {FaGreaterThan} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";
import {Outlet, useNavigate} from 'react-router-dom';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {Link} from "react-router-dom";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Input
} from "@material-tailwind/react";
import axios from "axios";
import wallet from "../../components/WalletPage/Wallet";

function MydModalWithGrid(props) {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const handleCloseLogout = () => setShowLogout(false);
    const handleShowLogout = () => setShowLogout(true);
    const [image, setImage] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const [userLocal, setUserLocal] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/api/users/' + user.id)
            .then( res => {
                console.log(res.data);
                setUserLocal(res.data);
                setImage(res.data.image);
            })
            .catch(err => console.error(err))
    }, []);
    const handleLogout = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const accessToken = user.accessToken;
            console.log(user);
            await axios.post('http://localhost:8080/api/auth/logout', {token: accessToken})
                .then((response) => {
                    localStorage.removeItem('user');
                    console.log('Response from server:', response.data);
                    navigate("/login");
                });
        } catch (error) {
            console.error('Error:', error);
        }

    };
    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
                        <IoMdClose onClick={props.onHide} className="close-icon"/>
                        <span className="title-text mb-1">My Account</span>
                        <Button style={{marginLeft: 160}} variant="outline-success" className="btn-sign-out"
                                onClick={handleShowLogout}>Sign
                            Out</Button>{' '}
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body className="grid-example">
                    <Container>
                        <div style={{textAlign: 'center'}}>
                            <div>
                                <Image
                                    src={image}
                                    style={{width: '65px', height: '65px', margin: 'auto'}} roundedCircle/>
                            </div>
                            <div className='mx-2'>
                                <span style={{fontSize: '20px'}}>{user.username}</span>
                                <br/>
                                <span style={{fontSize: '14px'}}>{user.email}</span>
                            </div>
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{marginLeft: 160}} variant="outline-success" className="btn-sign-out">Delete
                        Account</Button>{' '}
                </Modal.Footer>
            </Modal>

            <Modal show={showLogout} onHide={handleCloseLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <img src="https://web.moneylover.me/static/img/image-404.8f4ef91.png"/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogout}>
                        Nope
                    </Button>
                    <Button variant="success" onClick={handleLogout}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const SideBar = ({onWalletSelect}) => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalShow, setModalShow] = useState(false);
    const [toggled, setToggled] = React.useState(false);
    const [image, setImage] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const [userLocal, setUserLocal] = useState([]);
    const [wallet_list, setWallet] = useState([])
    const [selectedWallet, setSelectedWallet] = useState("all");

    function fetchWallets() {
        axios.get('http://localhost:8080/api/wallets/user/' + user.id)
            .then((response) => {
                setWallet(response.data);
            })
    }

    const handleWalletSelect = (id) => {
        setSelectedWallet(id);
        onWalletSelect(id);
    };

    const totalAmount = wallet_list.reduce((total, wallet) => total + Number(wallet.balance), 0);


    useEffect(() => {
        axios.get('http://localhost:8080/api/users/' + user.id)
            .then(res => {
                console.log(res.data);
                setUserLocal(res.data);
                setImage(res.data.image);
                fetchWallets();
            })
            .catch(err => console.error(err))
    }, []);

    function handleSelectAll() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonthIndex = currentDate.getMonth();
        handleWalletSelect("all");
        onWalletSelect("all");
    }

    return (
        <div>
            <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)}/>
            <Offcanvas show={show} onHide={handleClose} style={{width: '27.5%'}}>
                <Offcanvas.Header style={{margin: 'auto'}}>
                    <Container>
                        <div style={{textAlign: 'center',marginTop: '15%'}}>
                            <div>
                                <Image
                                    src={image}
                                    style={{width: '65px', height: '65px', margin: 'auto'}} roundedCircle/>
                            </div>
                            <div className='mx-2'>
                                <span style={{fontSize: '20px'}}>{user.username}</span>
                                <br/>
                                <span style={{fontSize: '14px'}}>{user.email}</span>
                            </div>
                        </div>
                    </Container>
                </Offcanvas.Header>

                <hr style={{height: '0.1px', backgroundColor: 'black'}}/>
                <Offcanvas.Body>
                    <TableContainer style={{marginTop: '-5%'}}>
                        <Table>
                            <Tr className="hover-div" onClick={() => setModalShow(true)}>
                                <Td><FaUserAstronaut className="icon"/></Td>
                                <Td class="text-left">My Account</Td>
                                <Td><FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/></Td>
                            </Tr>

                            <Tr className="hover-div">
                                <Td>
                                    <Link to={"/auth/wallets"}>
                                        <MdAccountBalanceWallet className="icon"/>
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/wallets"} className="text-reset">
                                        My Wallets
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/wallets"}>
                                        <FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/>
                                    </Link>
                                </Td>
                            </Tr>

                            <Tr className="hover-div">
                                <Td>
                                    <Link to={"/auth/categories"}>
                                        <PiIntersectThreeBold className="icon"/>
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/categories"} className="text-reset">
                                        Categories
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/categories"}>
                                        <FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/>
                                    </Link>
                                </Td>
                            </Tr>
                            <Tr className="hover-div">
                                <Td>
                                    <Link to={"/auth/piechart"}>
                                        <PiIntersectThreeBold className="icon"/>
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/piechart"} className="text-reset">
                                        Chart
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={"/auth/piechart"}>
                                        <FaGreaterThan style={{marginLeft: 'auto'}} className="icon-1"/>
                                    </Link>
                                </Td>
                            </Tr>
                        </Table>
                    </TableContainer>
                </Offcanvas.Body>
            </Offcanvas>

            <div style={{position: 'relative', backgroundColor: '#DCDCDC'}} className="w-screen h-screen">
                <div style={{backgroundColor: 'white', width: '100%'}} className="mt-50">
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand>
                                <Menu className="bg-white">
                                    <MenuHandler>
                                        <Button style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", width:'200px' }}>

                                            {
                                                selectedWallet !== "all" ? (
                                                    <>
                                                        <img src="https://static.moneylover.me/img/icon/icon.png"
                                                             alt="Wallet Icon"
                                                             style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                                        <div>
                                                            <div className='text-black'>{selectedWallet.name}</div>
                                                            <div className='text-black'>{selectedWallet.balance}</div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <img src="https://static.moneylover.me/img/icon/ic_category_all.png" alt="Wallet Icon"
                                                             style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                                        <div>
                                                            <div className='text-black'>Total</div>
                                                            <div className='text-black'>{totalAmount}</div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </Button>
                                    </MenuHandler>
                                    <MenuList className="max-h-72" style={{ marginTop: '10px', width: '100px' }}>
                                        <MenuItem
                                            onClick={() => handleSelectAll()}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="https://static.moneylover.me/img/icon/ic_category_all.png"
                                                     alt="Wallet Icon"
                                                     style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                                <div>Total</div>
                                            </div>
                                            <div>{totalAmount}</div>
                                        </MenuItem>
                                        <hr className='my-3'/>
                                        {wallet_list.map((data) => (
                                            <MenuItem key={data.id} onClick={() => handleWalletSelect(data.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src="https://static.moneylover.me/img/icon/icon.png"
                                                         alt="Wallet Icon"
                                                         style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                                    <div>{data.name}</div>
                                                </div>
                                                <div>{data.balance}</div>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text style={{display: "flex", alignItems: "center", marginRight: '-10%'}}>
                                    <BsCalendar2Date style={{marginRight: 30, fontSize: '20px'}}/>
                                    <GiSheikahEye style={{marginRight: 30, fontSize: '20px'}}/>
                                    <FaSearch style={{fontSize: '20px'}}/>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                {/* Phần chú thích cho phần trung tâm */}
                <div className="central-content" style={{marginLeft: '6%', marginTop: 'auto', height: '85.5%'}}>
                    <Outlet/>
                </div>

                <div className="h-screen" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    width: '6%',
                    backgroundColor: 'white',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{
                            marginTop: '40%',
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <IoReorderThree className="ml-3" style={{width: '30px', height: '30px', color: '#696969'}}
                                            onClick={handleShow}/>
                        </div>
                        <div style={{
                            marginTop: '40%',
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Link to= "/auth/transactions">
                                <MdAccountBalanceWallet className="ml-2.5"
                                                        style={{width: '25px', height: '25px', color: '#228B22'}}/>
                            </Link>
                            <span className="ml-2.5"
                                  style={{marginTop: '5px', textAlign: 'center', color: '#228B22'}}>Transactions</span>
                        </div>
                        <hr style={{height: '0.1px', backgroundColor: 'black'}}/>
                        <div style={{
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaCartShopping className="ml-2.5"
                                            style={{width: '25px', height: '25px', color: '#D3D3D3'}}/>
                            <span className="ml-2.5"
                                  style={{marginTop: '5px', textAlign: 'center', color: '#D3D3D3'}}>Store</span>
                        </div>
                        <div style={{
                            marginTop: '40%',
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaCircleQuestion className="ml-2.5"
                                              style={{width: '25px', height: '25px', color: '#D3D3D3'}}/>
                            <span className="ml-2.5"
                                  style={{marginTop: '5px', textAlign: 'center', color: '#D3D3D3'}}>Help</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    );
};

export default SideBar;