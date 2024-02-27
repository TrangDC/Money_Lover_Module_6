import React, {Fragment, useEffect, useState} from 'react';
import {HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch} from "react-icons/hi";
import {Menu, Popover, Transition} from "@headlessui/react";
import classNames from "classnames";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
// import {MDBInput, MDBTypography} from "mdb-react-ui-kit";
// import {BsPersonFill} from "react-icons/bs";
// import Container from "react-bootstrap/Container";
// import Image from "react-bootstrap/Image";
// import ListGroup from "react-bootstrap/ListGroup";
// import {IoMdWallet} from "react-icons/io";
// import {FaLayerGroup} from "react-icons/fa6";
// import {LuLogOut} from "react-icons/lu";
// import Button from "react-bootstrap/Button";

const Header = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [show, setShow] = useState(false);
    const handleChangePassword = () => setShowChangePassword (true);
    const handleClose = () => setShow(false);

    const [image, setImage] = useState("")

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/' + user.id)
            .then(res => {
                console.log(res.data);
                setImage(res.data.image);
            })
            .catch(err => console.error(err))
    }, )


    const navigate = useNavigate();

    return (
        <div className='bg-white h-16 px-4 flex justify-between items-center
                        border-b border-gray-200'>
            <div className='relative'>
                <HiOutlineSearch fontSize={20}
                                 className='text-gray-400 absolute
                                            top-1/2 -translate-y-1/2 left-3'/>
                <input type='text'
                       placeholder='Search your wallet...'
                       className='text-sm focus:outline-none active:outline-none
                                  h-10 w-[24rem] border border-gray-400 rounded-sm pr-4 pl-11'
                />
            </div>
            <div className='flex items-center gap-2 mr-2'>
                <Popover className='relative'>
                    {({open}) => (
                        <>
                            <Popover.Button
                                className={classNames(
                                    open && 'bg-gray-100',
                                    'group inline-flex items-center rounded-sm ' +
                                    'p-1.5 text-gray-700 hover:text-opacity-100 ' +
                                    'focus:outline-none active:bg-gray-100'
                                )}
                            >
                                <HiOutlineChatAlt fontSize={24} />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-80'>
                                    <div className='bg-white rounded-sm shadow-md
                                                    ring-1 ring-black ring-opacity-5
                                                    px-2 py-2.5'
                                    >
                                        <strong className='text-gray-700 font-medium'>Message</strong>
                                        <div className='mt-2 py-1 text-sm'>
                                            This is message panel
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
                <Popover className='relative'>
                    {({open}) => (
                        <>
                            <Popover.Button
                                className={classNames(
                                    open && 'bg-gray-100',
                                    'group inline-flex items-center rounded-sm ' +
                                    'p-1.5 text-gray-700 hover:text-opacity-100 ' +
                                    'focus:outline-none active:bg-gray-100'
                                )}
                            >
                                <HiOutlineBell fontSize={24}/>
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-80'>
                                    <div className='bg-white rounded-sm shadow-md
                                                    ring-1 ring-black ring-opacity-5
                                                    px-2 py-2.5'
                                    >
                                        <strong className='text-gray-700 font-medium'>Notifications</strong>
                                        <div className='mt-2 py-1 text-sm'>
                                            This is notification panel
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="ml-2 inline-flex rounded-full
                                                focus:outline-none focus:ring-2
                                                focus:ring-neutral-400"
                        >
                            <span className="sr-only">Open user menu</span>
                            <div className='h-10 w-10 rounded-full bg-white
                                            bg-cover bg-no-repeat bg-center'
                            >
                                <img src={image} alt={'image'}/>
                                <span className='sr-only'>
                                                Hugh Jackson
                                            </span>
                            </div>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right z-10 absolute right-0
                                                        mt-2 w-48 rounded-sm shadow-md p-1 bg-white
                                                        ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            className={classNames(
                                                active && 'bg-gray-100',
                                                'active:bg-gray-200 rounded-sm ' +
                                                'px-4 py-2 text-gray-700 cursor-pointer ' +
                                                'focus:bg-gray-200'
                                            )}
                                            onClick={() => (
                                                navigate("profile")
                                            )}>
                                            Your Profile
                                        </div>

                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            className={classNames(
                                                active && 'bg-gray-100',
                                                'active:bg-gray-200 rounded-sm ' +
                                                'px-4 py-2 text-gray-700 cursor-pointer ' +
                                                'focus:bg-gray-200'
                                            )}
                                            >
                                            <Link onClick={handleChangePassword}>Change Password</Link>

                                        </div>

                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            className={classNames(
                                                active && 'bg-gray-100',
                                                'active:bg-gray-200 rounded-sm ' +
                                                'px-4 py-2 text-gray-700 cursor-pointer ' +
                                                'focus:bg-gray-200'
                                            )}
                                            onClick={() => (
                                                navigate("/logout")
                                            )}>
                                            Logout
                                        </div>

                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </div>
                </Menu>
            </div>

            <Modal
                show={showChangePassword}
                onHide={handleClose}
                keyboard={false}
                size="lg"
                style={{height: "600px"}}
            >
                <div className="flex ">
                    <div className="flex-1 w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="confirm-password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
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
                            <button
                                type="submit"
                                className="btn btn-success w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Reset passwod
                            </button>
                            <button
                                onClick={handleClose}
                                className="btn btn-success w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                    <div className="flex-1">
                        <img style={{marginTop: "130px"}} className="justify-center align-items-center" src="https://firebasestorage.googleapis.com/v0/b/upload-img-76277.appspot.com/o/images%2Fstatic%2F1200x630wa.png?alt=media&token=dce9577a-5ee2-416c-ad05-dde82e371407" alt=""/>
                    </div>

                </div>
            </Modal>

        </div>
    );
};

export default Header;