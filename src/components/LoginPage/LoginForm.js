import React from 'react';
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
}
    from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";

const LoginForm = () => {
    return (
        <>
            <MDBCard className='shadow-5 text-center' style={{marginTop: '-130px',marginLeft: '365px', backdropFilter: 'blur(30px)',borderRadius: '1rem', maxWidth: '650px'}}>
                <MDBCardBody className='p-5 text-center'>
                            <h2 className="fw-bold text-black mb-5 text-center" style={{marginTop: '-30px'}}>Log In</h2>
                            <MDBRow>
                            <MDBCol col='10' md='6'>
                                <p className="text-black-50 mb-3">Using social networking accounts
                                </p>
                                <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                                    <MDBIcon className="m-n3"/>
                                    Sign in with Facebook
                                </MDBBtn>

                                <MDBBtn className="mb-4 w-100" size="lg" color='danger'>
                                    <MDBIcon className="m-n3"/>
                                    Sign in with Gmail
                                </MDBBtn>
                                <MDBBtn className="mb-4 w-100" size="lg" color='dark'>
                                    <MDBIcon className="m-n3"/>
                                    Sign in with Apple
                                </MDBBtn>
                            </MDBCol>
                                <MDBCol col='6' md='6'>
                                    <p className="text-black-50 mb-3">Using Money Lover account</p>
                                    <div>
                                        <MDBInput wrapperClass='mb-4 w-100'  label='Email address' id='formControlLg' type='email' size="lg"/>
                                        <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>
                                        <p className="small mb-3 pb-lg-2"><a className="text-green-50" href="#!">Forgot password?</a></p>
                                    </div>
                                    <MDBBtn className='w-100 mb-4' size='md' color='success'>LOGIN</MDBBtn>
                                    <p style={{color: 'black'}}>Don't have an account? <Link to="/register" style={{color: 'green'}}>Register here</Link></p>
                                </MDBCol>
                                </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </>
    );
};

export default LoginForm;