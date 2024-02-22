import React, {Fragment} from 'react';
import {HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch} from "react-icons/hi";
import {Menu, Popover, Transition} from "@headlessui/react";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

const Header = () => {

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
                            <div className='h-10 w-10 rounded-full bg-sky-500
                                            bg-cover bg-no-repeat bg-center'
                                 style={{backgroundImage:`url("https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`}}
                            >
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
                                <Menu.Items className="origin-top-right z-10 absolute
                                                       right-0 mt-2 w-48 rounded-sm
                                                       shadow-md p-1 bg-white ring-1 ring-opacity-5
                                                       focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button className="text-gray-700 focus:bg-gray-200 block"
                                                    onClick={() => (
                                                    navigate("/profile")
                                                )}>
                                                    Your Profile
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => (
                                                    navigate("/settings")
                                                )}>
                                                    Settings
                                                </button>
                                            )}
                                        </Menu.Item>
                                </Menu.Items>
                            </Transition>
                    </div>
                </Menu>
            </div>
        </div>
    );
};

export default Header;