import React from 'react';
import {Outlet} from 'react-router-dom';
const Layout = () => {
    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen'>
            <div className='bg-sky-100'>sidebar</div>
            <div className='bg-teal-100'>header</div>
            <Outlet/>
        </div>
    );
};

export default Layout;