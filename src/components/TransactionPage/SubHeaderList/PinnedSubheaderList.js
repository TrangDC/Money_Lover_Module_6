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

    useEffect(() => {
        const fetchData = async () => {
            const data = await TransactionService.fetchTransactions();
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
            <div style={{ width: "600px", height: '500px' }}>
                <nav>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            {/* Previous month button */}
                            <Button
                                variant="outlined"
                                class="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                                onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, -1)}>
                                {currentMonthIndex === 0 ? months[11] : months[currentMonthIndex - 1]} {currentMonthIndex === 0 ? currentYear - 1 : currentYear}
                            </Button>
                            {/* Current month button */}
                            <Button variant="outlined"
                                    class="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}>{months[currentMonthIndex]} {currentYear}</Button>
                            {/* Next month button */}
                            <Button
                                variant="outlined"
                                class="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                                onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, 1)}>
                                {currentMonthIndex === 11 ? months[0] : months[currentMonthIndex + 1]} {currentMonthIndex === 11 ? currentYear + 1 : currentYear}
                            </Button>
                        </div>
                        {/* Inflow and outflow summary */}
                        <div className="inflow-outflow">
                            <div>
                                <span>Inflow:</span> <span style={{ color: 'blue' }}>{totalInflow > 0 ? '+' + totalInflow : totalInflow}</span>
                            </div>
                            <div>
                                <span>Outflow:</span> <span style={{ color: 'red' }}>{totalOutflow > 0 ? '-' + totalOutflow : totalOutflow}</span>
                            </div>
                            <div>
                                <span>Total:</span> <span>{totalInflow - totalOutflow < 0 ? '-' : '+'} {Math.abs(totalInflow - totalOutflow)}</span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/* Transaction list */}
                    <List className="bg-body-secondary rounded-lg shadow-lg mt-4 overflow-auto" style={{ maxHeight: "430px" }}>
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
                                        {/* Date subheader */}
                                        <ListItem className="sticky-top bg-light">{date.toDateString()}</ListItem>
                                        {/* Transaction items */}
                                        {transactions.map((transaction) => (
                                            <ListItem
                                                class="flex items-center py-2 px-4 border-t border-gray-200"
                                                key={transaction.id}
                                                onClick={() => handleTransactionClick(transaction)}>
                                                {/* Avatar */}
                                                <ListItemPrefix>
                                                    <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
                                                </ListItemPrefix>
                                                {/* Transaction details */}
                                                <div className="flex justify-between w-full">
                                                    {/* Category name */}
                                                    <div>
                                                        <Typography variant="h6" color="blue-gray">
                                                            {transaction.category.name}
                                                        </Typography>
                                                    </div>
                                                    {/* Amount */}
                                                    <div>
                                                        <Typography variant="h5" style={{ color: transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? 'blue' : 'red' }} class="font-normal">
                                                            {transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? '+' : '-'}{transaction.amount}
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