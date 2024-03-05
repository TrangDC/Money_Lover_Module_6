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
export default function PinnedSubheaderList() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [totalInflow, setTotalInflow] = useState(0);
    const [totalOutflow, setTotalOutflow] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            const data = await TransactionService.fetchTransactions(user);
            setTransactions(data);
            localStorage.setItem("transactions", JSON.stringify(data))
        };

        fetchData();
    }, [currentMonthIndex]);

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
    };

    const handleCloseClick = () => {
        setSelectedTransaction(null);
    };

    const groupedTransactions = groupTransactionsByDate();

    return (
        <div className="root flex justify-center">
            <div style={{ width: "600px", height: '500px' }} className="bg-white rounded-lg shadow-lg">
                <nav>
                    <div>
                        <div className="flex justify-content-center mt-0.5">
                            <Button
                                variant="text"
                                class="rounded-none border-b border-blue-gray-50 bg-transparent p-2"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                                onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, -1)}>
                                {currentMonthIndex === 0 ? months[11] : months[currentMonthIndex - 1]} {currentMonthIndex === 0 ? currentYear - 1 : currentYear}
                            </Button>
                            <Button variant="text"
                                    class="rounded-none border-b border-blue-gray-50 bg-transparent p-2"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}>{months[currentMonthIndex]} {currentYear}</Button>
                            <Button
                                variant="text"
                                class="rounded-none border-b border-blue-gray-50 bg-transparent p-2"
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
                                    {totalInflow.toLocaleString()} VNĐ
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="pl-5">Outflow:</p>
                                <p style={{ color: 'red' }} className="pr-5">
                                    {totalOutflow.toLocaleString()} VNĐ
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
                    <List className="bg-white rounded-lg shadow-lg mt-4 overflow-auto" style={{ maxHeight: "600px" }}>
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
                                                    <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
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
                </nav>
            </div>
        </div>


    );
}