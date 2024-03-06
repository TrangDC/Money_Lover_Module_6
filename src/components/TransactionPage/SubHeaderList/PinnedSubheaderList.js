import * as React from 'react';
import './PinnedSubheaderList.css';
import {useEffect, useState} from "react";
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

import {Link} from "react-router-dom";
import {MDBCardFooter, MDBCardHeader, MDBCardText} from "mdbreact";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";
import {MdOutlineClose} from "react-icons/md";

export default function PinnedSubheaderList({wallet_id}) {


    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [totalInflow, setTotalInflow] = useState(0);
    const [totalOutflow, setTotalOutflow] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));

    // display detail
    const [showDetail, setShowDetail] = useState(false)
    const handleClickX = () => {
        setShowDetail(false)
    }


    useEffect(() => {
        const fetchData = async () => {
            const data = await TransactionService.fetchTransactions(user, wallet_id);
            setTransactions(data);
            localStorage.setItem("transactions", JSON.stringify(data))
        };

        fetchData();
    }, [wallet_id]);

    useEffect(() => {
        const inflow = TransactionService.calculateTotalInflow(transactions);
        const outflow = TransactionService.calculateTotalOutflow(transactions);
        setTotalInflow(inflow);
        setTotalOutflow(outflow);
    }, [currentMonthIndex, transactions]);

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

    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetail(true)
    };

    const handleCloseClick = () => {
        setSelectedTransaction(null);
    };

    const groupedTransactions = groupTransactionsByDate();

    return (
        <div className={`root flex justify-center container_full ${showDetail ? 'selected' : ''}`}>
            <div className={`bg-white rounded-lg shadow-lg container-left ${showDetail ? 'selected' : ''}`}>
                <div>
                    <div className="header">
                        <Link to={"/auth/create_transaction"}>
                            <button type="button" className="button">
                                <span className="button__text">Add Transaction</span>
                                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                            </button>
                        </Link>
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
                        <hr className='my-1'/>
                        <div className="inflow-outflow">
                            <div className="flex justify-between">
                                <p className="pl-5">Inflow:</p>
                                <p style={{ color: 'blue' }} className="pr-5">
                                    +{totalInflow.toLocaleString()} VNĐ
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="pl-5">Outflow:</p>
                                <p style={{ color: 'red' }} className="pr-5">
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
                    <List className="bg-white rounded-lg shadow-lg mt-4 overflow-auto" style={{ maxHeight: "550px" }}>
                        {groupedTransactions.length === 0 ? (
                            <div style={{ height: "430px" }}>
                                <ListItem>
                                    No transactions for this month
                                </ListItem>
                                <Button variant="outlined" onClick={() => handleCurrentMonth(setCurrentMonthIndex, setCurrentYear)}>Back to Current Month</Button>
                            </div>
                        ) : (
                            <List className="list" class="border-t border-gray-200">
                                {groupedTransactions.map(({ date, transactions }) => (
                                    <div>
                                        <hr className='my-0.5'/>
                                        <ListItem className="sticky-top bg-light px-4 py-2 ml-0 flex justify-between items-center" style={{ height: '5rem' }}>
                                            <div className="flex items-center">
                                                <div className="text-5xl font-bold mr-2">{date.getDate()}</div> {/* Largest font size for the day number */}
                                                <div className="text-lg flex flex-col">
                                                    <div className='text-sm'>{date.toLocaleString('en-US', { weekday: 'long' })}</div> {/* Day name */}
                                                    <div className='text-sm'>{date.toLocaleString('en-US', { month: 'long' })}</div> {/* Month name */}
                                                    <div className='text-sm'>{date.getFullYear()}</div> {/* Year */}
                                                </div>
                                            </div>
                                        </ListItem>
                                        <hr className='my-0.5'/>

                                        {transactions.map((transaction) => (
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
                                    </div>
                                ))}
                            </List>
                        )}
                    </List>
                </div>
            </div>
            <div className={`container-right ${showDetail ? 'selected' : ''}`}>
                {
                    showDetail && (
                            <MDBCardBody>
                                <div className="card ml-5" style={{ width: '90vh', height: '300px' }}>
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
                                                        src={selectedTransaction.image}
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
                            </MDBCardBody>
                        )
                    }
            </div>
        </div>


    );
}