import React from 'react';
import {Outlet} from 'react-router-dom';
const Layout = () => {
    return (
        <div>
            <div>sidebar</div>
            <div>header</div>
            <Outlet/>
        </div>
    );
};

export default Layout;