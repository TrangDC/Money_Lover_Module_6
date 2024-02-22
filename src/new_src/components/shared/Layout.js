import React from 'react';
import {Outlet} from 'react-router-dom';
import SideBar from "../../../layout/SideBar/SideBar";
const Layout = () => {
    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
            <SideBar/>
            <div className='p-4'>
                <div className='bg-teal-100'>header</div>
                <Outlet/>
            </div>

        </div>
    );
};

export default Layout;