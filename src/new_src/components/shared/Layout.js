import React from 'react';
import {Outlet} from 'react-router-dom';
const Layout = () => {
    return (
        <div>
            <div className='bg-sky-100'>sidebar</div>
            <div className='bg-teal-100'>header</div>
            <Outlet/>
        </div>
    );
};

export default Layout;