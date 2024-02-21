import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MdHome } from "react-icons/md";
import {FaMoneyCheckAlt, FaUser} from "react-icons/fa";
import {RiWallet3Fill} from "react-icons/ri";
import {FaCirclePlus} from "react-icons/fa6";
import './HeaderCss.css';
import colors from "tailwindcss/colors";

const HeaderPage = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#"><div className="firstAdd"><FaCirclePlus  /></div></Navbar.Brand>
                <Navbar.Brand href="#"><div className="first"><MdHome /></div>Overview</Navbar.Brand>
                <Navbar.Brand href="#"><div className="first"><RiWallet3Fill /></div> Transaction book</Navbar.Brand>
                <Navbar.Brand href="#"><div className="first"><FaMoneyCheckAlt /></div> Budget</Navbar.Brand>
                <Navbar.Brand href="#"><div className="first"><FaUser /></div><div className="last"> Account</div></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
            </Container>
        </Navbar>
    );
};

export default HeaderPage;