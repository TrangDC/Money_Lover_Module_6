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
import "./IncomePiechart.css"
import TransactionService from "../../services/transactions.services";
import {ListItem} from "@material-tailwind/react";
import {useWallet} from "../WalletContext";
import {setNestedObjectValues} from "formik";
import {addWeeks, addYears, endOfWeek, format, startOfWeek, subWeeks, subYears} from "date-fns";
const IncomePiechart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [startDateRange, setStartDateRange] = useState('');
    const [endDateRange, setEndDateRange] = useState('');
    const [show, setShow] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [listTransaction, setListTransaction] = useState([]);
    const [incomeCategory, setIncomeCategory] = useState([])
    const [incomeAmount, setIncomeAmount] = useState([])
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [navigator, setNavigator] = useState('month');
    const { selectedWalletId } = useWallet();
    const [transactionDate, setTransactionDate] = useState('')
    const [startWeek, setStartWeek] = useState('');
    const [endWeek, setEndWeek] = useState('')
    const formattedYear = format(currentDate, 'yyyy');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userdata = JSON.parse(localStorage.getItem("user"));
    console.log(userdata)

    useEffect(() => {
        const fetchData = async () => {
            getTransactionIncome(userdata, selectedWalletId, navigator);
        };
        fetchData();
    }, [selectedWalletId, currentYear, currentMonthIndex, transactionDate, formattedYear, startWeek, endWeek, startDateRange, endDateRange]);

    //handle month filter
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handlePrevNextMonths = (currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment) => {
        TransactionService.handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment);

    };

    const handleCurrentMonth = (setCurrentMonthIndex, setCurrentYear) => {
        TransactionService.handleCurrentMonth(setCurrentMonthIndex, setCurrentYear);
    };

    // display select transaction by day
    const goToPreviousDay = () => {
        const previousDate = new Date(currentDate);
        previousDate.setDate(previousDate.getDate() - 1);
        setCurrentDate(previousDate);
        setTransactionDate(format(previousDate, 'yyyy-MM-dd'));
    };

    const goToNextDay = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setCurrentDate(nextDate);
        setTransactionDate(format(nextDate, 'yyyy-MM-dd'));
    };

    const formatDateString = (date) => {
        return date.toDateString();
    };

    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);

    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);


    // display select transaction by year
    const goToPreviousYear = () => {
        setCurrentDate((prevDate) => subYears(prevDate, 1));
    };
    const goToPresentYear = () => {
        setCurrentDate(new Date());
    };
    const goToNextYear = () => {
        setCurrentDate((prevDate) => addYears(prevDate, 1));
    };

    //handle filter week
    const goToPreviousWeek = () => {
        const prevWeekStart = startOfWeek(subWeeks(currentDate, 1));
        const prevWeekEnd = endOfWeek(subWeeks(currentDate, 1));
        setStartWeek(format(prevWeekStart, 'yyyy-MM-dd'));
        setEndWeek(format(prevWeekEnd, 'yyyy-MM-dd'));
        setCurrentDate((prevDate) => subWeeks(prevDate, 1));
    };

    const goToPresentWeek = () => {
        const presentWeekStart = startOfWeek(new Date());
        const presentWeekEnd = endOfWeek(new Date());
        setStartWeek(format(presentWeekStart, 'yyyy-MM-dd'));
        setEndWeek(format(presentWeekEnd, 'yyyy-MM-dd'));
        setCurrentDate(new Date());
    };

    const goToNextWeek = () => {
        const nextWeekStart = startOfWeek(addWeeks(currentDate, 1));
        const nextWeekEnd = endOfWeek(addWeeks(currentDate, 1));
        setStartWeek(format(nextWeekStart, 'yyyy-MM-dd'));
        setEndWeek(format(nextWeekEnd, 'yyyy-MM-dd'));
        setCurrentDate((prevDate) => addWeeks(prevDate, 1));
    };
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // Sunday


    const handleSearch = () => {
        axios.post(`http://localhost:8080/api/time_filter/user/${userdata.id}/income_transaction/${selectedWalletId}/time_range`, {
            startWeek: startDateRange,
            endWeek: endDateRange
        })
            .then((res) => {
                console.log(res);
                setListTransaction(res.data);
                getlist(res.data);
                setShow(false);
                onClose();
                setNavigator("range");
            })
            .catch((error) => {
                console.error("Error fetching transaction data:", error);
                // Handle error, such as setting appropriate state to indicate error
            });
    }

    const getTransactionIncome = (userdata, wallet_id, navigator) => {
        if (wallet_id) {
            if (navigator === 'month') {
                axios.get(`http://localhost:8080/api/time_filter/user/${userdata.id}/income_transaction/${wallet_id}/date/${currentYear}/${currentMonthIndex}`)
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
            if (navigator === 'day') {
                axios.post(`http://localhost:8080/api/time_filter/user/${userdata.id}/income_transaction/${wallet_id}/day`, {
                    transactionDate: transactionDate
                })
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

            if (navigator === 'week') {
                axios.post(`http://localhost:8080/api/time_filter/user/${userdata.id}/income_transaction/${wallet_id}/week`, {
                    startWeek: startWeek,
                    endWeek: endWeek
                })
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
            if (navigator === 'year') {
                axios.get(`http://localhost:8080/api/time_filter/user/${userdata.id}/income_transaction/${wallet_id}/year/${formattedYear}`)
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

        }
    };
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
        <div >
            <MDBCard className="card-chart">
                <MDBCardBody >
                    <div style={{width: '50%',height: '50%',margin: 'auto'}}>
                        {startDateRange && endDateRange && navigator === 'range' && (
                            <div>
                                <p>From: {startDateRange}</p>
                                <p>To: {endDateRange}</p>
                            </div>
                        )}
                        { navigator === 'month' && (
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
                        )}
                        {navigator === "day" && (
                            <div className="flex justify-content-center mt-0.5">
                                <Button
                                    variant="text"
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={goToPreviousDay}
                                >
                                    {formatDateString(previousDate)}
                                </Button>
                                <Button
                                    variant="text"
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                >
                                    {formatDateString(currentDate)}</Button>
                                <Button
                                    variant="text"
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={goToNextDay}
                                >
                                    {formatDateString(nextDate)}
                                </Button>
                            </div>
                        )}
                        {navigator === 'week' && (
                            <div className="flex justify-content-center mt-0.5">
                                <Button
                                    variant="text"
                                    className="fix-button rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={goToPreviousWeek}>
                                    {`${format(subWeeks(startDate, 1), 'yyyy-MM-dd')} to ${format(subWeeks(endDate, 1), 'yyyy-MM-dd')}`}
                                </Button>
                                <Button
                                    variant="text"
                                    className="fix-button btn-mid rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={goToPresentWeek}>
                                    {`${format(startDate, 'yyyy-MM-dd')} to ${format(endDate, 'yyyy-MM-dd')}`}
                                </Button>
                                <Button
                                    variant="text"
                                    className="fix-button rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={goToNextWeek}>
                                    {`${format(addWeeks(startDate, 1), 'yyyy-MM-dd')} to ${format(addWeeks(endDate, 1), 'yyyy-MM-dd')}`}
                                </Button>
                            </div>
                        )}
                        {navigator === 'year' && (
                            <div className="flex justify-content-center mt-0.5">
                                <Button
                                    variant="text"
                                    className="fix-button rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-year"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={goToPreviousYear}
                                >
                                    {parseInt(formattedYear) - 1} {/* Previous year */}
                                </Button>
                                <Button
                                    variant="text"
                                    className="fix-button btn-mid rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-year btn-color"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={goToPresentYear}
                                >
                                    {formattedYear} {/* Current year */}
                                </Button>
                                <Button
                                    variant="text"
                                    className="fix-button rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-year"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={goToNextYear}
                                >
                                    {parseInt(formattedYear) + 1} {/* Next year */}
                                </Button>

                            </div>
                        )}
                        <Tabs isFitted variant='enclosed'>
                            <CgCalendarDates style={{width: '30px', height: '30px', marginLeft: '100%'}}
                                             onClick={handleShow}/>
                            <TabPanels>
                                <TabPanel>
                                    {listTransaction.length === 0 ? (
                                        <div style={{height: "430px"}}>
                                            <Image
                                                style={{margin: "auto"}}
                                                borderRadius='full'
                                                boxSize='300px'
                                                src='https://t4.ftcdn.net/jpg/04/52/43/87/360_F_452438771_qBPO91hhFQK5tiJCfff93Y90C0NvT3Zi.jpg'
                                                alt=''
                                            />
                                            {navigator === 'month' && (
                                                <Button style={{margin: "auto"}} variant="outlined"
                                                        onClick={() => handleCurrentMonth(setCurrentMonthIndex, setCurrentYear)}>Back
                                                    to Current Month</Button>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <Doughnut data={data}/>
                                            <div style={{maxHeight: '300px', margin: 'auto', overflowY: 'auto'}}>

                                                <TableContainer>
                                                    <Table variant='simple'>
                                                        <Tbody>
                                                            {listTransaction.map((transaction) => (
                                                                <Tr>
                                                                    <Td style={{display: 'flex', alignItems: 'center' }}>
                                                                        <Image
                                                                            borderRadius='full'
                                                                            boxSize='50px'
                                                                            src={transaction.category.image}
                                                                            alt=""
                                                                        />
                                                                        <span style={{ marginLeft: '5px' }}>{transaction.category.name}</span>
                                                                    </Td>
                                                                    <Td style={{ textAlign: 'right' }}>{transaction.amount.toLocaleString()} vnd</Td>
                                                                </Tr>
                                                            ))}
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer>
                                            </div>
                                        </div>
                                    )}
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
                            <div style={{ display: 'flex', alignItems: 'center',marginTop: '-10px' }} onClick={() => setNavigator("day")}>
                                <CiCalendarDate style={{ height: '40px', width: '40px' }} /> <span style={{ marginLeft: '5px' }}>Day</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }} onClick={() => setNavigator("week")}>
                                <BsCalendar2Week style={{ height: '30px', width: '30px',marginLeft: '5px' }} /> <span style={{ marginLeft: '10px' }}>Week</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }} onClick={() => setNavigator("month")}>
                                <IoCalendarNumberOutline style={{ height: '30px', width: '30px',marginLeft: '5px'  }} /> <span style={{ marginLeft: '10px' }}>Month</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }} onClick={() => setNavigator("year")}>
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
                            <Input type={"date"} value={startDateRange} onChange={(e) => setStartDateRange(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>To</FormLabel>
                            <Input type={"date"} value={endDateRange} onChange={(e) => setEndDateRange(e.target.value)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} colorScheme='green' variant='outline'>Cancel</Button>
                        <Button colorScheme='greengreen' variant='outline' onClick={handleSearch}>
                            Select Time
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
};
export default IncomePiechart;