import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import axios from "axios";
import React, {useEffect} from 'react';
import {Doughnut} from 'react-chartjs-3';
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
import { Image } from '@chakra-ui/react';
import { CgCalendarDates } from "react-icons/cg";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CiCalendarDate } from "react-icons/ci";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsCalendar2Week } from "react-icons/bs";
import { LiaCalendarWeekSolid } from "react-icons/lia";
const IncomePiechart = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [listTransaction, setListTransaction] = useState([]);
    const [incomeCategory, setIncomeCategory] = useState([])
    const [incomeAmount, setIncomeAmount] = useState([])
    const [wallet_id, setWallet_id] = useState("8")
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"));
        console.log(userdata)
        getTransactionIncome(userdata, wallet_id)
    },[wallet_id])
    const getTransactionIncome = (userdata, wallet_id) => {
        axios.get(`http://localhost:8080/api/transactions/user/${userdata.id}/income_transaction/${wallet_id}`)
            .then((res) => {
                console.log(res)
                setListTransaction(res.data);
                getlist(res.data);
            })
    }

    function getlist(transactions) {
        const incomeCategory = [];
        const incomeAmount = [];
        transactions.forEach(transaction => {
            // nếu transaction thuộc type income
            if (transaction.category.type === "INCOME") {
                const index = incomeCategory.indexOf(transaction.category.name)
                if (index === -1) {
                    incomeCategory.push(transaction.category.name);
                    incomeAmount.push(transaction.amount)
                }
                incomeAmount[index] += transaction.amount
            }
        })
        setIncomeCategory(incomeCategory);
        setIncomeAmount(incomeAmount)
    }


    const data = {
        labels: incomeCategory,
        datasets: [{
            data: incomeAmount,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#9aff56',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#a2ff56',
            ]
        }]
    };


    return (
        <div>
            <div style={{width: '50%',height: '50%',margin: 'auto'}}>

                <Tabs isFitted variant='enclosed'>
                    <CgCalendarDates style={{width: '30px',height: '30px',marginLeft: '100%'}} onClick={handleShow} />
                    <TabList mb='1em'>
                        <Tab>One</Tab>
                        <Tab>Two</Tab>
                        <Tab>Three</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Doughnut  data={data} />
                            <div style={{height: '50%',margin: 'auto'}}>
                                <TableContainer>
                                    <Table variant='simple'>
                                        <Tbody>
                                            {listTransaction.map((transaction) => (
                                                <Tr>
                                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src={transaction.category.image}
                                                            alt=""
                                                        />
                                                        <span style={{ marginLeft: '5px' }}>{transaction.category.name}</span>
                                                    </Td>
                                                    <Td style={{ textAlign: 'right' }}>{transaction.amount} vnd</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
            <Offcanvas style={{height: '50%'}} show={show} onHide={handleClose} placement="bottom">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Select time range</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div style={{ display: 'flex', alignItems: 'center',marginTop: '-10px' }}>
                        <CiCalendarDate style={{ height: '40px', width: '40px' }} /> <span style={{ marginLeft: '5px' }}>Day</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <BsCalendar2Week style={{ height: '30px', width: '30px',marginLeft: '5px' }} /> <span style={{ marginLeft: '10px' }}>Week</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <IoCalendarNumberOutline style={{ height: '30px', width: '30px',marginLeft: '5px'  }} /> <span style={{ marginLeft: '10px' }}>Month</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <LiaCalendarWeekSolid style={{ height: '40px', width: '40px' }} /> <span style={{ marginLeft: '5px' }}>Year</span>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};
export default IncomePiechart;