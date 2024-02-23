import React from 'react';

import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';

import { MdHome } from "react-icons/md";
import {FaMoneyCheckAlt, FaUser} from "react-icons/fa";
import {RiWallet3Fill} from "react-icons/ri";
import {FaCirclePlus} from "react-icons/fa6";
import './SideBar.css';
import {Link} from "react-router-dom";

const SideBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
            <Container fluid>
                <div className="d-flex flex-column">
                    <Link to="#" className="text-dark mb-3">
                        <div className="firstAdd">
                            <FaCirclePlus/>
                        </div>
                    </Link>
                    <Link to="#" className="text-dark mb-3">
                        <div className="first">
                            <MdHome />
                        </div>Overview
                    </Link>
                    <Link to="#" className="text-dark mb-3">
                        <div className="first">
                            <RiWallet3Fill />
                        </div>
                        Transaction book
                    </Link>
                    <Link to="#" className="text-dark mb-3">
                        <div className="first">
                            <FaMoneyCheckAlt />
                        </div>
                        Budget
                    </Link>
                    <Link to="/user" className="text-dark">
                        <div className="first">
                            <FaUser />
                        </div>
                        <div className="last">
                            Account
                        </div>
                    </Link>
                </div>
                <Navbar.Toggle aria-controls="navbarScroll" />
            </Container>
        </Navbar>
    );
};

export default SideBar;