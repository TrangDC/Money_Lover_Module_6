import React from 'react';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
const Error = () => {
    return (

        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden'}}>
            <img src="https://note.moneylover.me/content/images/2017/05/Money-Lover---Logo.png" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '-1'}} />

            <div style={{position: 'absolute',top: '10%', left: '49%', transform: 'translate(-50%, -50%)', width: '500px', height: '100px', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #fff'}}>
                <h2 style={{marginTop: '0', color: '#333', textAlign: 'center'}}>Vui Lòng Đăng Nhập Để Sử Dụng</h2>
                <Link to="/login" style={{display: 'flex', justifyContent: 'center'}}>
                    <Button type="button" variant="outline-success">
                        LogIn
                    </Button>
                </Link>
            </div>
        </div>

    );
};

export default Error;
