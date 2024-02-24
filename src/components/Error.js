import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div>
            <p>Bạn chưa có quyền truy cập</p>

            <Link to={"/login"}>Quay v trag đăng nhập login</Link>
        </div>
    );
};

export default Error;