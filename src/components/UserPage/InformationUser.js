import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { BsPersonFill } from "react-icons/bs";
import { MDBTypography } from 'mdb-react-ui-kit';
import { IoMdWallet } from "react-icons/io";
import { FaLayerGroup } from "react-icons/fa6";
import { IoLinkSharp } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { FaArrowsSpin } from "react-icons/fa6";
import { BsClipboardFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { TbToolsOff } from "react-icons/tb";
import { IoIosAirplane } from "react-icons/io";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";



const InformationUser = () => {
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
                    <MDBTypography>
                        <BsPersonFill className = "mx-2 mb-2" style={{width: '30px' ,height: '30px'}}/>
                        <MDBTypography tag='strong'>Account Management</MDBTypography>
                    </MDBTypography>
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

                <ListGroup.Item className='text-success'>
                    <IoLinkSharp className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} color='green'/>
                        Bank link
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"><p></p></ListGroup.Item>

                <ListGroup.Item>
                    <MdEvent className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Event
                </ListGroup.Item>
                <ListGroup.Item>
                    <FaArrowsSpin className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Periodic Transactions
                </ListGroup.Item>
                <ListGroup.Item>
                    <BsClipboardFill className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Bill
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"> <p></p> </ListGroup.Item>

                <ListGroup.Item>
                    <GiReceiveMoney className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Paybook
                </ListGroup.Item>
                <ListGroup.Item>
                    <TbToolsOff  className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Tools
                </ListGroup.Item>
                <ListGroup.Item>
                    <IoIosAirplane  className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Travel Mode
                </ListGroup.Item>
                <ListGroup.Item>
                    <RiFileExcel2Fill  className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Export Data To Excel
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"> <p></p> </ListGroup.Item>

                <ListGroup.Item>
                    <FaCartShopping className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Shop
                </ListGroup.Item>

                <ListGroup.Item variant="secondary"> <p></p> </ListGroup.Item>

                <ListGroup.Item>
                    <TbPigMoney className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Discover Money Lover
                </ListGroup.Item>
                <ListGroup.Item>
                    <FaRegQuestionCircle  className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Support
                </ListGroup.Item>
                <ListGroup.Item>
                    <IoSettingsSharp className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Setting
                </ListGroup.Item>
                <ListGroup.Item>
                    <IoInformationCircle className = "mx-2 mb-1 " style={{width: '25px' ,height: '25px'}} />
                    Introduce
                </ListGroup.Item>

            </ListGroup>

        </div>
    );
};

export default InformationUser;