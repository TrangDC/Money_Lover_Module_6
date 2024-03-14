import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Doughnut } from "react-chartjs-3";
import { Image, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCol,
    MDBRow
} from 'mdb-react-ui-kit';
import {MDBCardText} from "mdbreact";
import {Link} from "react-router-dom";
import {useWallet} from "../WalletContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
import PropTypes from "prop-types";

const ChartPage = () => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    const {selectedWalletId} = useWallet();
    const [listTransactionIncome, setListTransactionIncome] = useState([]);
    const [incomeCategory, setIncomeCategory] = useState([]);
    const [incomeAmount, setIncomeAmount] = useState([]);
    const [listTransactionEx, setListTransactionEx] = useState([]);
    const [exCategory, setExCategory] = useState([]);
    const [exAmount, setExAmount] = useState([]);

    useEffect(() => {
        if (selectedWalletId) {
            const fetchData = async () => {
                getTransactionIncome(userdata, selectedWalletId);
                getTransactionEx(userdata, selectedWalletId);
            };
            fetchData();
        }
    }, [selectedWalletId]);

    const getTransactionIncome = (userdata, selectedWalletId) => {
        if (selectedWalletId) {
            axios.get(`http://localhost:8080/api/transactions/user/${userdata.id}/income_transaction/${selectedWalletId}`)
                .then((res) => {
                    console.log(res);
                    setListTransactionIncome(res.data);
                    getlistIncome(res.data, setIncomeCategory, setIncomeAmount);
                })
                .catch((error) => {
                    console.error("Error fetching income transaction data:", error);
                });
        }
    };

    function getlistIncome(transactions, setCategory, setAmount) {
        const category = [];
        const amount = [];
        transactions.forEach(transaction => {
            if (transaction.category.type === "INCOME") {
                const index = category.indexOf(transaction.category.name)
                if (index === -1) {
                    category.push(transaction.category.name);
                    amount.push(transaction.amount);
                }
                else amount[index] += transaction.amount
            }
        })
        setCategory(category);
        setAmount(amount)
    }

    const getTransactionEx = (userdata, selectedWalletId) => {
        if (selectedWalletId) {
            axios.get(`http://localhost:8080/api/transactions/user/${userdata.id}/expense_transaction/${selectedWalletId}`)
                .then((res) => {
                    console.log(res);
                    setListTransactionEx(res.data);
                    getlistExpesen(res.data, setExCategory, setExAmount);
                })
                .catch((error) => {
                    console.error("Error fetching expense transaction data:", error);
                });
        }
    };

    function getlistExpesen(transactions, setCategory, setAmount) {
        const category = [];
        const amount = [];
        transactions.forEach(transaction => {
            if (transaction.category.type === "EXPENSE") {
                const index = category.indexOf(transaction.category.name)
                if (index === -1) {
                    category.push(transaction.category.name);
                    amount.push(transaction.amount);
                }
                else amount[index] += transaction.amount
            }
        })
        setCategory(category);
        setAmount(amount)
    }

    const dataIncome = {
        labels: incomeCategory,
        datasets: [{
            data: incomeAmount,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#9aff56',
                '#e056ff',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#a2ff56',
                '#9456ff',
            ]
        }]
    };

    const dataEx = {
        labels: exCategory,
        datasets: [{
            data: exAmount,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#9aff56',
                '#e056ff',
                '#5664ff'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#a2ff56',
                '#9456ff',
                '#56ffeb'
            ]
        }]
    };

    // Net Income Calculation
    const calculateNetIncome = () => {
        let totalIncome = incomeAmount.reduce((acc, cur) => acc + cur, 0);
        let totalExpense = exAmount.reduce((acc, cur) => acc + cur, 0);
        return totalIncome - totalExpense;
    };

    return (
        <div>
            <div className="div-card">
                <MDBRow className='card-simplegrid row-cols-1 row-cols-md-3 g-4'>
                    <MDBCol style={{ width: '33%' }}>
                        <MDBCard className='h-100'>
                            <Doughnut data={dataIncome} position='top' />
                            <MDBCardBody>
                                <MDBCardText>
                                    <div style={{ maxHeight: '400px', marginLeft: '50px', overflowY: 'auto', maxWidth:'400px' }}>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Tbody>
                                                    {listTransactionIncome.map((transaction) => (
                                                        <Tr key={transaction._id}>
                                                            <Td style={{ display: 'flex', alignItems: 'center' }}>
                                                                <Image
                                                                    borderRadius='full'
                                                                    boxSize='50px'
                                                                    src={transaction.category.image}
                                                                    alt=""
                                                                />
                                                                <span style={{ marginLeft: '5px' }}>{transaction.category.name}</span>
                                                            </Td>
                                                            <Td style={{ textAlign: 'right' }}>{transaction.amount} vnd </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <Link to= "/auth/piechart" className='text-dark' >
                                    <span>See Income Detail</span>
                                </Link>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol style={{ width: '33%' }}>
                        <MDBCard className='h-100'>
                            <Doughnut data={dataEx} position='top' />
                            <MDBCardBody>
                                <MDBCardText>
                                    <div style={{ maxHeight: '400px', marginLeft: '70px', overflowY: 'auto' }}>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Tbody>
                                                    {listTransactionEx.map((transaction) => (
                                                        <Tr key={transaction._id}>
                                                            <Td style={{ display: 'flex', alignItems: 'center' }}>
                                                                <Image
                                                                    borderRadius='full'
                                                                    boxSize='50px'
                                                                    src={transaction.category.image}
                                                                    alt=""
                                                                />
                                                                <span style={{ marginLeft: '5px' }}>{transaction.category.name}</span>
                                                            </Td>
                                                            <Td style={{ textAlign: 'right' }}>{transaction.amount} vnd </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <Link to= "/auth/exchart" className='text-dark' >
                                    <span>See Expense Detail</span>
                                </Link>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol style={{ width: '33%' }}>
                        <MDBCard className='h-100'>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1vh' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        Total
                                    </div>
                                    <div style={{ marginLeft: '10vh', color: 'red', fontSize: '20px', fontWeight: 'bold' }}>
                                        <span variant="h2" color="textSecondary">
                                            Net Income: {calculateNetIncome()}
                                        </span>
                                    </div>
                                </div>
                                <BarChart
                                    width={600}
                                    height={400}
                                    data={[
                                        {
                                            name: "Net Income",
                                            income: incomeAmount.reduce((a, b) => a + b, 0),
                                            expense: exAmount.reduce((a, b) => a + b, 0),
                                        }
                                    ]}
                                    margin={{
                                        top: 10,
                                        right: 50,
                                        left: 10,
                                        bottom: 5
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 'dataMax']} />
                                    <Tooltip />
                                    <Legend />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Bar dataKey="income" fill='#36A2EB ' barSize={60} left={20} />
                                    <Bar dataKey="expense" fill="#FF6384"  barSize={60} />
                                </BarChart>
                                <Barchart listTransaction={listTransactionEx} />
                            </div>
                            {/* Content for the third card */}
                            <MDBCardFooter>
                                <Link to= "/auth/chart2" className='text-dark' >
                                    <span>total revenue expenditure</span>
                                </Link>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    );
};

function Barchart({ listTransaction }) {
    return (
        <Table variant='simple'>

            <div style={{marginLeft:'5vh',  overflowY: 'auto', maxHeight: '300px'}}>
                <Tbody>
                    {listTransaction.map((transactions) => (
                        <Tr key={transactions.id}>
                            <Td style={{ display: 'flex', alignItems: 'center',marginLeft:'4' }}>
                                <Image
                                    borderRadius='full'
                                    boxSize='50px'
                                    src={transactions.category.image}
                                    alt=""
                                />
                                <span style={{ marginLeft: '10vh' }}>{transactions.category.name}</span>
                            </Td>
                            <Td style={{ textAlign: 'right' }}>{transactions.amount} vnd</Td>
                        </Tr>
                    ))}
                </Tbody>
            </div>
        </Table>
    );
}

Barchart.propTypes = {
    listTransaction: PropTypes.array.isRequired
};

export default ChartPage;