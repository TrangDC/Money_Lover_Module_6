import React, {useState} from 'react';

import {
    MDBInput,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';
import axios from "axios";
import LoadingOverlay from 'react-loading-overlay';
import {useNavigate} from "react-router-dom";
const ActiveAccount = () => {

    const navigate = useNavigate();

    const [authCode, setAuthCode] = useState('');
    const [activeSuccess, setActiveSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAuthCodeChange = (event) => {
        setAuthCode(event.target.value);
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/users/process_active/${authCode}`);
            console.log(response.data);

            setActiveSuccess(true);

            setTimeout(() => {
                setIsLoading(true);
                navigate('/login');
            }, 5000);
        } catch (error) {
            setIsLoading(true);
            console.error('Error:', error);
        }
    };

    return (
        <LoadingOverlay
            active={isLoading}
            spinner
            text="Đang tải..."
            className="overlay"
            timeout={3000}
        >
        <div style={{position: "relative"}}>
            {activeSuccess ? (
                <h5 style={{position: "absolute", top: "250px", left: "50%", transform: "translateX(-50%)", textAlign: "center"}}>Active successful! Redirect to login...</h5>
            ) : (
                <form style={{position:"absolute", top: "250px", left: "50%", transform: "translate(-50%, -50%)"}} onSubmit={handleSubmit}>
                    <h5 style={{textAlign: "center"}}>Wait a minute!</h5>
                    <h5 style={{textAlign: "center"}}>An active code has been sent to your email.</h5>
                    <h4 style={{textAlign: "center"}}>Enter Auth Code</h4>
                    <MDBCol col='12' md='12' style={{marginTop: "50px"}} >
                        <MDBInput className='mb-4' type='password' id='form1Example2' label='Enter Auth Code' value={authCode} onChange={handleAuthCodeChange} />
                        <MDBBtn type='submit' block>
                            Submit
                        </MDBBtn>
                    </MDBCol>
                </form>
            )}
        </div>
        </LoadingOverlay>
    );
};

export default ActiveAccount;