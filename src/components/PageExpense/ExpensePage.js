import {Tabs, TabList, TabPanels, Tab, TabPanel, FormLabel, FormControl, Input, useDisclosure} from '@chakra-ui/react';
import axios from "axios";
import React, {useEffect, useState} from 'react';
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
} from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { FaPen } from "react-icons/fa";
import { Image } from '@chakra-ui/react';
import { CgCalendarDates } from "react-icons/cg";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CiCalendarDate } from "react-icons/ci";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsCalendar2Week } from "react-icons/bs";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import {MDBCard, MDBCardBody} from "mdb-react-ui-kit";
import "./Expense.css"
import TransactionService from "../../services/transactions.services";
import {ListItem} from "@material-tailwind/react";
import {useWallet} from "../WalletContext";
const ExpensePieChart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userdata = JSON.parse(localStorage.getItem("user"));
    console.log(userdata)

    const [listTransaction, setListTransaction] = useState([]);
    const [incomeCategory, setIncomeCategory] = useState([])
    const [incomeAmount, setIncomeAmount] = useState([])
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [wallet_id, setWallet_id] = useState('all');

    const { selectedWalletId } = useWallet();

    useEffect(() => {
        const fetchData = async () => {
            getTransactionIncome(userdata, selectedWalletId);
        };
        fetchData();
    }, [selectedWalletId, currentYear, currentMonthIndex]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handlePrevNextMonths = (currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment) => {
        TransactionService.handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment);

    };

    const handleCurrentMonth = (setCurrentMonthIndex, setCurrentYear) => {
        TransactionService.handleCurrentMonth(setCurrentMonthIndex, setCurrentYear);
    };
    const getTransactionIncome = (userdata, wallet_id) => {
        if (wallet_id) {
            axios.get(`http://localhost:8080/api/transactions/user/${userdata.id}/expense_transaction/${wallet_id}/date/${currentYear}/${currentMonthIndex}`)
                .then((res) => {
                    console.log(res);
                    setListTransaction(res.data);
                    getlist(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching transaction data:", error);
                    // Handle error, such as setting appropriate state to indicate error
                });
        }
    };
    function getlist(transactions) {
        const incomeCategory = [];
        const incomeAmount = [];
        transactions.forEach(transaction => {
            // nếu transaction thuộc type income
            if (transaction.category.type === "EXPENSE") {
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
        <div >
            <MDBCard className="card-chart">
                <MDBCardBody >
                    <div style={{width: '50%',height: '50%',margin: 'auto'}}>
                        {startDate && endDate && (
                            <div>
                                <p>From: {startDate}</p>
                                <p>To: {endDate}</p>
                            </div>
                        )}
                        <div className="flex justify-content-center mt-0.5">

                            <Button
                                variant="text"
                                className="rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                                onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, -1)}>
                                {currentMonthIndex === 0 ? months[11] : months[currentMonthIndex - 1]} {currentMonthIndex === 0 ? currentYear - 1 : currentYear}
                            </Button>
                            <Button variant="text"
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month btn-color"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}>{months[currentMonthIndex]} {currentYear}</Button>
                            <Button
                                variant="text"
                                className="rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                                onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, 1)}>
                                {currentMonthIndex === 11 ? months[0] : months[currentMonthIndex + 1]} {currentMonthIndex === 11 ? currentYear + 1 : currentYear}
                            </Button>
                        </div>
                        <Tabs isFitted variant='enclosed'>
                            <CgCalendarDates style={{width: '30px',height: '30px',marginLeft: '100%'}} onClick={handleShow} />
                            <TabPanels>
                                <TabPanel>
                                    {listTransaction.length === 0 ? (
                                        <div style={{ height: "430px" }}>
                                            <ListItem>
                                                No transactions for this month
                                            </ListItem>
                                            <Button variant="outlined" onClick={() => handleCurrentMonth(setCurrentMonthIndex, setCurrentYear)}>Back to Current Month</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Doughnut  data={data} />
                                            <div style={{maxHeight: '300px',margin: 'auto',overflowY: 'auto'}}>

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
                                        </div>
                                    )
                                    }

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
                    <Offcanvas style={{width: '20%'}} show={show} onHide={handleClose} placement="end">
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
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }} onClick={onOpen}>
                                <FaPen style={{ height: '20px', width: '20px',marginLeft: '10px' }} /> <span style={{ marginLeft: '15px' }}>Custom</span>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </MDBCardBody>
            </MDBCard>

            {/*modal custom*/}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Date Range</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>From</FormLabel>
                            <Input type={"date"} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>To</FormLabel>
                            <Input type={"date"} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} colorScheme='green' variant='outline'>Cancel</Button>
                        <Button colorScheme='greengreen' variant='outline'>
                            Select Time
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
};
export default ExpensePieChart;