import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import { GiWallet } from "react-icons/gi";
const CategoriesPage = () => {
    return (
        <div>
            <Navbar>
                <Link to="/user" className="text-dark" >
                    <IoMdArrowRoundBack className="mx-2 mb-2 my-2" style={{ width: '30px', height: '30px' }} />
                </Link>
                <h4 className= "mx-2 mb-2 my-2">
                    Categories
                </h4>
                <Button variant="success" style={{margin: 'auto'}}>Create Category New</Button>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <GiWallet />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        </div>
    );
};

export default CategoriesPage;