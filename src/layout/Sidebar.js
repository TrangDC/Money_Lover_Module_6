import React, {useState} from 'react';
import {FcBullish} from "react-icons/fc";
import {DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS} from "../services/lib/consts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames";
import {HiOutlineLogout} from "react-icons/hi";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const linkClasses =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const Sidebar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleLogout = async () => {
        try {

            const user = JSON.parse(localStorage.getItem('user'));
            const accessToken = user.accessToken;
            console.log(user);
            await axios.post('http://localhost:8080/api/auth/logout', { token: accessToken })
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
        <div className="flex flex-col bg-green-400 w-60 p-3">
            <div className='flex items-center gap-2 px-1 py-3'>
                <FcBullish fontSize={24}/>
                <span className='text-neutral-900 text-lg'>Money Lover</span>
            </div>
            <div className='flex-1'>
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.index} item={item}/>
                ))}
            </div>
            <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.index} item={item}/>
                ))}
                <div className={classNames('cursor-pointer text-white text-base',linkClasses)}>
                    <Button onClick={handleShow}>
                        <span><HiOutlineLogout /> Logout</span>
                    </Button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Nope
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Sidebar;

function SidebarLink({item}) {

    const {pathname} = useLocation();

    return (
        <Link to={item.path}
              className={classNames(
                  pathname === item.path ?
                      'text-blue-900' :
                      'text-black',linkClasses)}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}