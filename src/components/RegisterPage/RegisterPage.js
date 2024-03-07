import React, {useState} from 'react';
import {
    MDBContainer
}
    from 'mdb-react-ui-kit';
import RegisterForm from "./RegisterForm";
import LoadingOverlay from 'react-loading-overlay';

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div>
            <LoadingOverlay
                active={isLoading}
                spinner
                text="Đang tải..."
                className="overlay h-screen w-screen"
                timeout={3000}
            >
            <MDBContainer fluid>
                <div className="p-5 bg-image justify-content-center" style={{background:"green", height: '350px'}}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/fir-2c9ce.appspot.com/o/Money-Lover---Logo.png?alt=media&token=01ddbb3b-dddb-4e07-b494-c4b4cdde884d"
                         style={{width: '350px',margin: 'auto'}}
                         alt="" fluid/>
                </div>
                <div style={{marginTop: '-125px'}}>
                <RegisterForm setIsLoading={setIsLoading} />
                </div>
            </MDBContainer>
            </LoadingOverlay>
        </div>
    );
};

export default RegisterPage;