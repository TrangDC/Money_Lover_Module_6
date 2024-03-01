import React, {useContext, useEffect, useState} from 'react';
import {IoBagHandle, IoCart, IoPeople, IoPieChart} from "react-icons/io5";
import {ThemeContext} from "../../layout/ThemeDark-Light/ThemeContext";
import "./ToggleDarkLight.css"
import { FaMoneyBill1Wave } from "react-icons/fa6";
import axios from "axios";


const DashboardStatsGrid = () => {

    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

    const [wallets, setWallets] = useState([])
    const [wallet , setWallet] = useState({
        name: "",
        balance: ""
    })
    const [userData, setUserData] = useState({})
    const [totalBalance, setTotalBalance] = useState(0)
    const fetchWallet = (userdata) => {
        axios.get('http://localhost:8080/api/users/' + userdata.id)
            .then((res) => {
                // window.localStorage.setItem("wallets", JSON.stringify((res.data.wallets)));

                const  wallets = JSON.parse(localStorage.getItem("wallets"))
                setWallets(wallets)

                const total = wallets.reduce((first, last) => first + last.balance, 0)
                setTotalBalance(total)
            })
    }

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"))
        setUserData(userdata)
        fetchWallet(userdata)
    }, [wallet])

    return (
        <div className='flex gap-4 w-full flex-column' style={{ backgroundColor: isDarkMode ? '#F5F5F5' : '#fff',textAlign: 'center'}}>
            <div className="toggle-switch-container" style={{ justifyContent: 'flex-end', marginTop: '10px' }}>
                <div className={`toggle-switch ${isDarkMode ? 'on' : 'off'}`} onClick={toggleDarkMode}>
                    <div className="slider"></div>
                </div>
            </div>
            <div className='flex gap-4 m-2' >
            <BoxWrapper className="flex-grow" >
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500" >
                    <FaMoneyBill1Wave  className="text-2xl text-white" />
                </div>
                <div className="pl-4" >

                    <span className="text-sm text-gray-500 font-light">Total Money</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{totalBalance.toString()}</strong>
                        {/*<span className="text-sm text-green-500 pl-2">+343</span>*/}
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper className="flex-grow">
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Expenses</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">$3423</strong>
                        <span className="text-sm text-green-500 pl-2">-343</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper className="flex-grow">
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Customers</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">12313</strong>
                        <span className="text-sm text-red-500 pl-2">-30</span>
                    </div>
                </div>
            </BoxWrapper>

            </div>

        </div>
    );
};

export default DashboardStatsGrid;

function BoxWrapper({children}) {
    return (
        <div className='bg-white rounded-sm p-4 flex-1
                        border border-gray-200 flex items-center' >
            {children}
        </div>
    )
}