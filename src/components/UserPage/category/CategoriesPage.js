import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import { IoMdCreate } from "react-icons/io";
import { FaLayerGroup } from "react-icons/fa6";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
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
import { Image } from '@chakra-ui/react'
const CategoriesPage = () => {
    return (
        <div>
            <div>
                <Navbar className="justify-content-between">
                    <div className="d-flex align-items-center">
                        <FaLayerGroup className="mx-2 mb-2 my-2 text-green-600" style={{ width: '30px', height: '30px' }} />
                        <h4 className="mx-2 mb-2 my-2">Categories</h4>
                    </div>
                    <div className="d-flex align-items-center text-green-600">
                        <IoMdCreate className= "mr-3" style={{ width: '30px', height: '30px' }}/>
                    </div>
                </Navbar>
            </div>

            <div style={{backgroundColor: 'white',width: '60%',margin: 'auto',marginTop: '3%',borderTopLeftRadius: '10px',borderTopRightRadius: '10px'}}>
                <Tabs variant='enclosed'>
                    <TabList>
                        <Tab style={{ fontWeight: 'bold', color: '#32CD32'}}>Required Expense</Tab>
                        <Tab style={{ fontWeight: 'bold', color: '#32CD32'}}>Up & Comers</Tab>
                        <Tab style={{ fontWeight: 'bold', color: '#32CD32'}}>Fun & Relax</Tab>
                        <Tab style={{ fontWeight: 'bold', color: '#32CD32'}}>Investing & Debt Payments</Tab>
                        <Tab style={{ fontWeight: 'bold', color: '#32CD32'}}>Income</Tab>
                        <Tab style={{ fontWeight: 'bold', color: '#32CD32'}}>Other</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <TableContainer>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_foodndrink.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Food & Beverage</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_transport.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Transportation</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_136.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Rentals</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_124.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Water Bill</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_134.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Phone Bill</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_125.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Electricity Bill</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_139.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Gas Bill</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_84.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Television Bill</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_126.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Internet Bill</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_138.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Other Utility Bills</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_29.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Home Maintenance</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_130.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Vehicle Maintenance</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_doctor.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Medical Check Up</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_137.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Insurances</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_education.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Education</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_107.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Houseware</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_41.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Personal Items</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_53.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Pets</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_8.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Home Services</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_other_expense.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Category details</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_70.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Fitness</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                        <Td>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='50px'
                                                    src='https://static.moneylover.me/img/icon/icon_63.png'
                                                    alt='Dan Abramov'
                                                />
                                                <span style={{ marginLeft: '10px' }}>Makeup</span>
                                            </div>
                                        </Td>
                                    </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_donations.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Gifts & Donations</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_94.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Streaming Service</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_49.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Fun Money</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_invest.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Investment</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_140.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Debt Collection</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_debt.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Debt</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_loan.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Loan</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_141.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Repayment</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_4.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Pay Interest</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_118.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Collect Interest</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Salary</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/ic_category_other_income.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Other Income</span>
                                                </div>
                                            </Td>
                                        </Tr>

                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_142.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Outgoing Transfer</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='50px'
                                                        src='https://static.moneylover.me/img/icon/icon_143.png'
                                                        alt='Dan Abramov'
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>Incoming Transfer</span>
                                                </div>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </div>

        </div>
    );
};

export default CategoriesPage;