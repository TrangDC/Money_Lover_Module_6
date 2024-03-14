import * as React from 'react';
import './PinnedSubheaderList.css';
import {useEffect, useState} from "react";
import {useChangeNotification} from "../../../ChangeNotificationContext";
import OutlinedCard from "../OutlinedCard/OutlinedCard";
import TransactionService from "../../../services/transactions.services";
import {Button, Navbar, TabsHeader} from "@material-tailwind/react";
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@material-tailwind/react";
import "./PinnedSubheaderList.css"

import {Link, useNavigate} from "react-router-dom";
import {MDBCardFooter, MDBCardHeader, MDBCardText} from "mdbreact";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow} from "mdb-react-ui-kit";
import {MdOutlineClose} from "react-icons/md";
import axios from "axios";
import {
    FormControl, FormLabel, Input,
    ModalBody, Modal,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure,
    useToast, Image
} from "@chakra-ui/react";
import {CgCalendarDates} from "react-icons/cg";
import Offcanvas from "react-bootstrap/Offcanvas";
import {CiCalendarDate} from "react-icons/ci";
import {BsCalendar2Week} from "react-icons/bs";
import {IoCalendarNumberOutline} from "react-icons/io5";
import {LiaCalendarWeekSolid} from "react-icons/lia";
import {useWallet} from "../../WalletContext";
import {
    addDays,
    addWeeks,
    addYears,
    endOfWeek, endOfYear,
    format,
    startOfWeek,
    startOfYear,
    subDays,
    subWeeks,
    subYears
} from "date-fns";
import {FaPen} from "react-icons/fa";

export default function PinnedSubheaderList() {

    const { selectedWalletId } = useWallet();
    const { notifyTransactionChange } = useChangeNotification();
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [totalInflow, setTotalInflow] = useState(0);
    const [totalOutflow, setTotalOutflow] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [navigation, setNavigation] = useState('month');
    const user = JSON.parse(localStorage.getItem('user'));
    const toast = useToast()
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [startDateRange, setStartDateRange] = useState('');
    const [endDateRange, setEndDateRange] = useState('');
    const [startWeek, setStartWeek] = useState('');
    const [endWeek, setEndWeek] = useState('')

    // display detail
    const [showDetail, setShowDetail] = useState(false)
    const handleClickX = () => {
        setShowDetail(false)
    }
    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetail(true)
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // handle filtered date
    const goToPreviousDay = () => {
        setCurrentDate(prevDate => subDays(prevDate, 1));
    };
    const goToNextDay = () => {
        setCurrentDate(prevDate => addDays(prevDate, 1));
    };
    const goToPresentDay = () => {
        setCurrentDate(new Date());
    };
    const filterTransactionsByDay = () => {
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transactionDate);
            return transactionDate.toDateString() === currentDate.toDateString();
        });
    };
    const groupTransactionsByDay = filterTransactionsByDay();

    // Handle month filtered
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const handlePrevNextMonths = (currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment) => {
        TransactionService.handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment)
    };
    const handleCurrentMonth = (setCurrentMonthIndex, setCurrentYear) => {
        TransactionService.handleCurrentMonth(setCurrentMonthIndex, setCurrentYear);
    };
    const groupTransactionsByDate = () => {
        return TransactionService.groupTransactionsByDate(transactions, currentMonthIndex, currentYear);
    };
    const groupedTransactions = groupTransactionsByDate();


    //handle week filtered
    const goToPreviousWeek = () => {
        console.log("Going to previous week");
        setCurrentDate((prevDate) => subWeeks(prevDate, 1));
    };

    const goToPresentWeek = () => {
        console.log("Going to present week");
        setCurrentDate(new Date());
    };

    const goToNextWeek = () => {
        console.log("Going to next week");
        setCurrentDate((prevDate) => addWeeks(prevDate, 1));
    };
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // Sunday

    const groupTransactionsByWeek = (transactions, currentDate) => {
        const groupedTransactions = {};

        transactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.transactionDate);
            const weekIdentifier = format(transactionDate, 'yyyy-ww'); // Format: YYYY-WW

            // Check if the transaction falls within the week of the currentDate
            const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
            const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // Sunday

            if (transactionDate >= startDate && transactionDate <= endDate) {
                if (!groupedTransactions[weekIdentifier]) {
                    groupedTransactions[weekIdentifier] = [];
                }

                groupedTransactions[weekIdentifier].push(transaction);
            }
        });

        return groupedTransactions;
    };
    const groupedTransactionsByWeek = groupTransactionsByWeek(transactions, currentDate);
    const groupedTransactionsArray = Object.entries(groupedTransactionsByWeek);


    //handle year filtered

    const formattedYear = format(currentDate, 'yyyy');
    const goToPreviousYear = () => {
        setCurrentDate((prevDate) => subYears(prevDate, 1));
    };
    const goToPresentYear = () => {
        setCurrentDate(new Date());
    };
    const goToNextYear = () => {
        setCurrentDate((prevDate) => addYears(prevDate, 1));
    };
    const groupTransactionsByYear = (transactions, currentDate) => {
        const groupedTransactions = {};

        transactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.transactionDate);
            const yearIdentifier = format(transactionDate, 'yyyy'); // Format: YYYY

            // Check if the transaction falls within the current year
            const startDate = startOfYear(currentDate);
            const endDate = endOfYear(currentDate);

            if (transactionDate >= startDate && transactionDate <= endDate) {
                if (!groupedTransactions[yearIdentifier]) {
                    groupedTransactions[yearIdentifier] = [];
                }

                groupedTransactions[yearIdentifier].push(transaction);
            }
        });

        return groupedTransactions;
    };
    const groupedTransactionsByYear = groupTransactionsByYear(transactions, currentDate);
    const groupedTransactionsArrayYear = Object.entries(groupedTransactionsByYear);

    const handleStartDateSelect = (date) => {
        setStartDateRange(date);
    };

// Method to handle selecting end date
    const handleEndDateSelect = (date) => {
        setEndDateRange(date);
    };

// Method to clear selected dates
    const clearSelectedDates = () => {
        setStartDateRange(null);
        setEndDateRange(null);
    };

    const handleApply = () => {
        setNavigation('range');
        axios.post(`http://localhost:8080/api/time_filter/user/${user.id}/transactions/${selectedWalletId}/time_range`, {
            startWeek: startDateRange,
            endWeek: endDateRange
        })
            .then((res) => {
                console.log(res);
                setTransactions(res.data);
                onClose();
            })
            .catch((error) => {
                console.error("Error fetching transaction data:", error);
                // Handle error, such as setting appropriate state to indicate error
            });


    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await TransactionService.fetchTransactions(user, selectedWalletId);
            setTransactions(data);
            notifyTransactionChange();
            localStorage.setItem("transactions", JSON.stringify(data));
            setCurrentMonthIndex(new Date().getMonth());
            setCurrentYear(new Date().getFullYear())
        };
        fetchData();
    }, [selectedWalletId, startDateRange, endDateRange]);

    const fetchData = () => {
        const fetchData = async () => {

            const data = await TransactionService.fetchTransactions(user, selectedWalletId);
            setTransactions(data);
            localStorage.setItem("transactions", JSON.stringify(data));
            setCurrentMonthIndex(new Date().getMonth());
            setCurrentYear(new Date().getFullYear())
        };
        fetchData();
    }

    useEffect(() => {
        const inflow = TransactionService.calculateTotalInflow(transactions);
        const outflow = TransactionService.calculateTotalOutflow(transactions);
        setTotalInflow(inflow);
        setTotalOutflow(outflow);
    }, [currentMonthIndex, transactions]);

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sủa?');
        if (confirm) {
            axios.delete(`http://localhost:8080/api/transactions/user/${user.id}/transaction/${id}`)
                .then(res => {
                    notifyTransactionChange();
                    toast({
                        title: 'Delete success!',
                        description: 'You successfully deleted a transaction!',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                    });
                    fetchData();
                    setShowDetail(false);
                    navigate("/auth/transactions");
                })
                .catch(err => console.log(err))
        }
    }

    function handleEditTransaction(transaction) {
        localStorage.setItem("transaction_edit", JSON.stringify(transaction));
        navigate("/auth/edit_transaction");
    }

    return (
        <div className={`root flex justify-center container_full ${showDetail ? 'selected' : ''}`}>
            <div className={`bg-white rounded-lg shadow-lg container-left ${showDetail ? 'selected' : ''}`}>
                <div>
                    <div className="header">
                        <MDBRow>
                            <MDBCol>
                                <Link to={"/auth/create_transaction"}>
                                    <button type="button" className="button">
                                        <span className="button__text">Add Transaction</span>
                                        <span className="button__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                         viewBox="0 0 24 24" stroke-width="2"
                                         stroke-linejoin="round" stroke-linecap="round"
                                         stroke="currentColor" height="24" fill="none"
                                         className="svg"><line y2="19" y1="5" x2="12"
                                                               x1="12"></line><line y2="12"
                                                                                    y1="12"
                                                                                    x2="19"
                                                                                    x1="5"></line>
                                    </svg>
                                </span>
                                    </button>
                                </Link>
                            </MDBCol>
                            <MDBCol>
                                <CgCalendarDates className='btn-show-range' onClick={handleShow}/>
                            </MDBCol>
                        </MDBRow>


                        {navigation === 'month' && (
                            <div className="flex justify-content-center mt-0.5">
                                <Button
                                    variant="text"
                                    className="fix-button rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, -1)}>
                                    {currentMonthIndex === 0 ? months[11] : months[currentMonthIndex - 1]} {currentMonthIndex === 0 ? currentYear - 1 : currentYear}
                                </Button>
                                <Button variant="text"
                                        className="fix-button btn-mid rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month btn-color"
                                        indicatorProps={{
                                            className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                        }}>{months[currentMonthIndex]} {currentYear}</Button>
                                <Button
                                    variant="text"
                                    className="fix-button rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                    onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, 1)}>
                                    {currentMonthIndex === 11 ? months[0] : months[currentMonthIndex + 1]} {currentMonthIndex === 11 ? currentYear + 1 : currentYear}
                                </Button>
                            </div>
                        )}
                        {navigation === 'day' && (
                            <div className="flex justify-content-center mt-0.5">
                                <Button
                                    variant="text"
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }} onClick={goToPreviousDay}>
                                    {format(subDays(currentDate, 1), 'yyyy-MM-dd')}
                                </Button>
                                <Button
                                    variant="text"
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }} onClick={goToPresentDay}>
                                    {format(currentDate, 'yyyy-MM-dd')}
                                </Button>
                                <Button
                                    variant="text"
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-2 btn-month"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }} onClick={goToNextDay}>
                                    {format(addDays(currentDate, 1), 'yyyy-MM-dd')}
                                </Button>
                            </div>
                        )}
                        {navigation === 'week' && (
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
                        {navigation === 'year' && (
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
                        {startDateRange && endDateRange && navigation === 'range' && (
                            <div>
                                <p>From: {startDateRange}</p>
                                <p>To: {endDateRange}</p>
                            </div>
                        )}
                        <hr className='my-1'/>
                        <div className="inflow-outflow">
                            <div className="flex justify-between">
                                <p className="pl-5">Inflow:</p>
                                <p style={{color: 'blue'}} className="pr-5">
                                    +{totalInflow.toLocaleString()} VNĐ
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="pl-5">Outflow:</p>
                                <p style={{color: 'red'}} className="pr-5">
                                    -{totalOutflow.toLocaleString()} VNĐ
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="pl-5">Total:</p>
                                <p className="pr-5">
                                    {(totalInflow - totalOutflow).toLocaleString()} VNĐ
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr className='my-0.5'/>
                    {navigation === "month" && (
                        <List className="bg-white rounded-lg shadow-lg mt-4 overflow-auto" style={{maxHeight: "450px"}}>
                            {groupedTransactions.length === 0 ? (

                                <div style={{height: "430px",textAlign:'center'}}>
                                    <Image
                                        style={{margin: "auto"}}
                                        borderRadius='full'
                                        boxSize='300px'
                                        src='https://t4.ftcdn.net/jpg/04/52/43/87/360_F_452438771_qBPO91hhFQK5tiJCfff93Y90C0NvT3Zi.jpg'
                                        alt=''
                                    />
                                    <Button  variant="outlined"
                                             onClick={() => handleCurrentMonth(setCurrentMonthIndex, setCurrentYear)}>Back
                                        to Current Month</Button>
                                </div>

                            ) : (
                                <List className="list" class="border-t border-gray-200">
                                    {groupedTransactions.map(({ date, transactions }) => {
                                        const filteredIncomeAndDebt = transactions.filter(transaction =>
                                            transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT'
                                        );
                                        const filteredExpenseAndLoan = transactions.filter(transaction =>
                                            transaction.category.type === 'EXPENSE' || transaction.category.type === 'LOAN'
                                        );
                                        const totalIncomeAndDebt = filteredIncomeAndDebt.reduce((total, transaction) => {
                                            return total + transaction.amount;
                                        }, 0);
                                        const totalExpenseAndLoan = filteredExpenseAndLoan.reduce((total, transaction) => {
                                            return total + transaction.amount;
                                        }, 0);
                                        const netAmount = totalIncomeAndDebt - totalExpenseAndLoan;
                                        return ( <div>
                                            <hr className='my-0.5'/>
                                            <ListItem
                                                className="sticky-top bg-light px-4 py-2 ml-0 flex justify-between items-center"
                                                style={{height: '5rem'}}>
                                                <div className="flex items-center">
                                                    <div className="text-5xl font-bold mr-2">{date.getDate()}</div>
                                                    {/* Largest font size for the day number */}
                                                    <div className="text-lg flex flex-col">
                                                        <div
                                                            className='text-sm'>{date.toLocaleString('en-US', {weekday: 'long'})}</div>
                                                        {/* Day name */}
                                                        <div
                                                            className='text-sm'>{date.toLocaleString('en-US', {month: 'long'})}</div>
                                                        {/* Month name */}
                                                        <div className='text-sm'>{date.getFullYear()}</div>
                                                        {/* Year */}
                                                    </div>
                                                </div>
                                                <h5>{netAmount.toLocaleString()} VNĐ</h5>
                                            </ListItem>
                                            <hr className='my-0.5'/>

                                            {transactions.map((transaction) => (
                                                <ListItem
                                                    class={`flex items-center py-2 px-4 border-t border-gray-200`}
                                                    key={transaction.id}
                                                    onClick={() => handleTransactionClick(transaction)}>
                                                    <ListItemPrefix className="pl-0">
                                                        <Avatar variant="circular" alt="candice"
                                                                src={transaction.category.image}/>
                                                    </ListItemPrefix>
                                                    <div className="flex justify-between w-full">
                                                        {/* Category name */}
                                                        <div>
                                                            <Typography variant="h6" color="blue-gray" className="pl-3">
                                                                {transaction.category.name}
                                                                <div className="text-lg flex flex-col">
                                                                    <div
                                                                        className='text-sm'>{transaction.note}</div>

                                                                </div>
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography variant="h5"
                                                                        style={{color: transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? 'blue' : 'red'}}
                                                                        class="font-normal">
                                                                {transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? '+' : '-'}{transaction.amount.toLocaleString()} VNĐ
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </ListItem>
                                            ))}
                                        </div>)
                                    })}
                                </List>
                            )}
                        </List>
                    )}
                    {navigation === "day" && (
                        <List className="bg-white rounded-lg shadow-lg mt-4 overflow-auto" style={{maxHeight: "450px"}}>
                            {groupTransactionsByDay.length === 0 ? (
                                <div style={{height: "430px", textAlign: 'center'}}>
                                    <ListItem style={{margin: "auto"}}>
                                        <Image
                                            style={{margin: "auto"}}
                                            borderRadius='full'
                                            boxSize='300px'
                                            src='https://t4.ftcdn.net/jpg/04/52/43/87/360_F_452438771_qBPO91hhFQK5tiJCfff93Y90C0NvT3Zi.jpg'
                                            alt=''
                                        />
                                    </ListItem>
                                    <Button style={{margin: "auto"}} variant="outlined"
                                            onClick={() => goToPresentDay()}>Back to Current Day</Button>
                                </div>
                            ) : (
                                <List className="list" class="border-t border-gray-200">
                                    {groupTransactionsByDay.map(transaction => (
                                        <ListItem
                                            class={`flex items-center py-2 px-4 border-t border-gray-200`}
                                            key={transaction.id}
                                            onClick={() => handleTransactionClick(transaction)}>
                                            <ListItemPrefix className="pl-0">
                                                <Avatar variant="circular" alt="candice" src={transaction.category.image} />
                                            </ListItemPrefix>
                                            <div className="flex justify-between w-full">
                                                {/* Category name */}
                                                <div>
                                                    <Typography variant="h6" color="blue-gray" className="pl-3">
                                                        {transaction.category.name}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h5" style={{ color: transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? 'blue' : 'red' }} class="font-normal">
                                                        {transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? '+' : '-'}{transaction.amount.toLocaleString()} VNĐ
                                                    </Typography>
                                                </div>
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </List>
                    )}
                    {navigation === "week" && (
                        <List className="bg-white rounded-lg shadow-lg mt-4 overflow-auto" style={{maxHeight: "450px"}}>
                            {Object.keys(groupedTransactionsArray).length === 0 ? (
                                <div style={{height: "430px", textAlign: 'center'}}>
                                    <ListItem style={{margin: "auto"}}>
                                        <Image
                                            style={{margin: "auto"}}
                                            borderRadius='full'
                                            boxSize='300px'
                                            src='https://t4.ftcdn.net/jpg/04/52/43/87/360_F_452438771_qBPO91hhFQK5tiJCfff93Y90C0NvT3Zi.jpg'
                                            alt=''
                                        />
                                    </ListItem>
                                    <Button style={{margin: "auto"}} variant="outlined"
                                            onClick={() => goToPresentWeek()}>Back to Current Week</Button>
                                </div>
                            ) : (
                                <List className="list" class="border-t border-gray-200">
                                    {groupedTransactionsArray.map(([weekIdentifier, transactions]) => (
                                        transactions.map(transaction => (
                                            <ListItem
                                                class={`flex items-center py-2 px-4 border-t border-gray-200`}
                                                key={transaction.id}
                                                onClick={() => handleTransactionClick(transaction)}>
                                                <ListItemPrefix className="pl-0">
                                                    <Avatar variant="circular" alt="candice" src={transaction.category.image} />
                                                </ListItemPrefix>
                                                <div className="flex justify-between w-full">
                                                    <div>
                                                        <Typography variant="h6" color="blue-gray" className="pl-3">
                                                            {transaction.category.name}
                                                            <div className="text-lg flex flex-col">
                                                                <div
                                                                    className='text-sm'>{transaction.transactionDate}</div>

                                                            </div>
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5"
                                                                    style={{color: transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? 'blue' : 'red'}}
                                                                    class="font-normal">
                                                            {transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? '+' : '-'}{transaction.amount.toLocaleString()} VNĐ
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </ListItem>
                                        ))
                                    ))}
                                </List>
                            )}
                        </List>
                    )}
                    {navigation === "year" && (
                        <List className="bg-white rounded-lg shadow-lg mt-4 overflow-auto" style={{maxHeight: "450px"}}>
                            {Object.keys(groupedTransactionsArrayYear).length === 0 ? (
                                <div style={{height: "430px", textAlign: 'center'}}>
                                    <ListItem style={{margin: "auto"}}>
                                        <Image
                                            style={{margin: "auto"}}
                                            borderRadius='full'
                                            boxSize='300px'
                                            src='https://t4.ftcdn.net/jpg/04/52/43/87/360_F_452438771_qBPO91hhFQK5tiJCfff93Y90C0NvT3Zi.jpg'
                                            alt=''
                                        />
                                    </ListItem>
                                    <Button style={{margin: "auto"}} variant="outlined"
                                            onClick={() => goToPresentYear()}>Back to Current Year</Button>
                                </div>
                            ) : (
                                <List className="list" class="border-t border-gray-200">
                                    {groupedTransactionsArrayYear.map(([yearIdentifier, transactions]) => (
                                        transactions.map(transaction => (
                                            <ListItem
                                                class={`flex items-center py-2 px-4 border-t border-gray-200`}
                                                key={transaction.id}
                                                onClick={() => handleTransactionClick(transaction)}>
                                                <ListItemPrefix className="pl-0">
                                                    <Avatar variant="circular" alt="candice" src={transaction.category.image} />
                                                </ListItemPrefix>
                                                <div className="flex justify-between w-full">
                                                    <div>
                                                        <Typography variant="h6" color="blue-gray" className="pl-3">
                                                            {transaction.category.name}
                                                            <div className="text-lg flex flex-col">
                                                                <div
                                                                    className='text-sm'>{transaction.transactionDate}</div>

                                                            </div>
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5"
                                                                    style={{color: transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? 'blue' : 'red'}}
                                                                    class="font-normal">
                                                            {transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? '+' : '-'}{transaction.amount.toLocaleString()} VNĐ
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </ListItem>
                                        ))
                                    ))}
                                </List>
                            )}
                        </List>
                    )}
                    {navigation === "range" && (
                        <List className="bg-white rounded-lg shadow-lg mt-4 overflow-auto" style={{maxHeight: "550px"}}>
                            {transactions.length === 0 ? (
                                <div style={{height: "430px", textAlign: 'center'}}>
                                    <ListItem>
                                        <Image
                                            style={{margin: "auto"}}
                                            borderRadius='full'
                                            boxSize='300px'
                                            src='https://t4.ftcdn.net/jpg/04/52/43/87/360_F_452438771_qBPO91hhFQK5tiJCfff93Y90C0NvT3Zi.jpg'
                                            alt=''
                                        />
                                    </ListItem>
                                </div>
                            ) : (
                                <List className="list" class="border-t border-gray-200">
                                    {transactions.map(transaction => (
                                        <ListItem
                                            class={`flex items-center py-2 px-4 border-t border-gray-200`}
                                            key={transaction.id}
                                            onClick={() => handleTransactionClick(transaction)}>
                                            <ListItemPrefix className="pl-0">
                                                <Avatar variant="circular" alt="candice" src={transaction.category.image} />
                                            </ListItemPrefix>
                                            <div className="flex justify-between w-full">
                                                {/* Category name */}
                                                <div>
                                                    <Typography variant="h6" color="blue-gray" className="pl-3">
                                                        {transaction.category.name}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h5" style={{ color: transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? 'blue' : 'red' }} class="font-normal">
                                                        {transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? '+' : '-'}{transaction.amount.toLocaleString()} VNĐ
                                                    </Typography>
                                                </div>
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </List>
                    )}
                </div>
            </div>
            <div className={`container-right ${showDetail ? 'selected' : ''}`}>
                {
                    showDetail && (
                        <MDBCardBody>
                            <div className="card ml-5" style={{width: '90vh', height: '300px'}}>
                                <div className="btn-x" onClick={handleClickX}>
                                    <MdOutlineClose/>
                                </div>
                                <div className="card-header ml-11">
                                    <h4>Transaction Details</h4>
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <div className="flex">
                                            <div className="transaction-footer ml-7">
                                                <img
                                                    src={selectedTransaction.category.image}
                                                    alt="avatar"
                                                    className="relative inline-block h-12 w-13 !rounded-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="ml-7">
                                                <h3>{selectedTransaction.category.name}</h3>
                                                <div className="transaction-footer">
                                                    <h6>{selectedTransaction.note}</h6>
                                                    <cite title="Source Title"></cite>
                                                </div>
                                                <footer className="transaction-footer text-gray-500">
                                                    <p className='text-sm'>{selectedTransaction.transactionDate}</p>
                                                    <cite title="Source Title"></cite>
                                                </footer>
                                            </div>
                                        </div>
                                        <hr className="mt-1 mb-2" style={{ width: '250px', borderColor: 'black', borderWidth: '1px' }} />
                                        <div className={'ml-20'} style={{ color: 'red' }}>
                                            <Typography variant="h2" style={{ color: selectedTransaction.category.type === 'INCOME' || selectedTransaction.category.type === 'DEBT' ? 'blue' : 'red' }} class="font-normal">
                                                {selectedTransaction.category.type === 'INCOME' || selectedTransaction.category.type === 'DEBT' ? '+' : '-'}{selectedTransaction.amount.toLocaleString()} VNĐ
                                            </Typography>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                            <MDBBtn className='me-1' color='warning' onClick={()=> handleEditTransaction(selectedTransaction)}>
                                Edit
                            </MDBBtn>
                            <MDBBtn className='me-1' onClick={() => {
                                handleDelete(selectedTransaction.id);
                            }} color='danger'>
                                Delete
                            </MDBBtn>
                        </MDBCardBody>
                    )
                }
            </div>
            <Offcanvas style={{width: '20%'}} show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Select time range</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '-10px'}}
                         onClick={() => setNavigation('day')}>
                        <CiCalendarDate style={{height: '40px', width: '40px'}}/> <span
                        style={{marginLeft: '5px'}}>Day</span>
                        <Button onClick={() => setNavigation('day')}>Choose</Button>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}
                         onClick={() => setNavigation('week')}>
                        <BsCalendar2Week style={{height: '30px', width: '30px', marginLeft: '5px'}}/> <span
                        style={{marginLeft: '10px'}}>Week</span>
                        <Button onClick={() => setNavigation('week')}>Week</Button>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}
                         onClick={() => setNavigation('month')}>
                        <IoCalendarNumberOutline style={{height: '30px', width: '30px', marginLeft: '5px'}}/> <span
                        style={{marginLeft: '10px'}}>Month</span>
                        <Button onClick={() => setNavigation('month')}>Month</Button>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}
                         onClick={() => setNavigation('year')}>
                        <LiaCalendarWeekSolid style={{height: '40px', width: '40px'}}/> <span
                        style={{marginLeft: '5px'}}>Year</span>
                        <Button onClick={() => setNavigation('year')}>Year</Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }} onClick={onOpen}>
                        <FaPen style={{ height: '20px', width: '20px',marginLeft: '10px' }} /> <span style={{ marginLeft: '15px' }}>Custom</span>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

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
                        <MDBBtn className='me-1' color='danger' onClick={onClose}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn className='me-1' color='success' onClick={handleApply}>
                            Select Time
                        </MDBBtn>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}