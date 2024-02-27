import React, {useContext} from 'react';
import DashboardStatsGrid from "./DashboardStatsGrid";
import TransactionChart from "./TransactionChart";
import BuyerProfileChart from "./BuyerProfileChart";
import RecentOrders from "./RecentOrders";
import PopularProducts from "./PopularProducts";
import {ThemeProvider} from '../../layout/ThemeDark-Light/ThemeContext';

const Dashboard = () => {
    return (
        <ThemeProvider>
            <div className="flex flex-col gap-4">
                <DashboardStatsGrid/>
                <div className="flex flex-row gap-4 w-full">
                    <TransactionChart/>
                    <BuyerProfileChart/>
                </div>
                <div className="flex flex-row gap-4 w-full">
                    <RecentOrders/>
                    <PopularProducts/>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;