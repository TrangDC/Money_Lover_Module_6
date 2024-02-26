import React from 'react';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";


const Error = () => {
    return (
        <div style={{margin: "auto", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div>
                <h2 style={{marginTop: "60%"}}>Bạn chưa có quyền truy cập</h2>
                <Link to={"/login"} style={{margin: "auto", display: "flex", justifyContent: "center", marginTop: "50px"}}>
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init>
                        Login Page
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default Error;