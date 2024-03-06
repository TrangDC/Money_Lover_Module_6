import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-3';
import axios from "axios";
const IncomePiechart = () => {

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
        <div className="pieChart">
            <Doughnut  data={data} />
            {incomeCategory.map((data, index) => (
                <div>
                    <p>{data}</p>
                </div>

                ))}
        </div>
    );
};
export default IncomePiechart;