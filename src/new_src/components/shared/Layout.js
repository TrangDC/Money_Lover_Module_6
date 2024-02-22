import React from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from "./Sidebar";
const Layout = () => {
    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
            <Sidebar/>
            <div className='p-4'>
                <div className='bg-teal-100'>header</div>
                <Outlet/>
            </div>

        </div>
    );
};

export default Layout;