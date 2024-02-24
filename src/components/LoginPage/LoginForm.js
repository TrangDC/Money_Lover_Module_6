import React, { useState } from 'react';
import './login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { FaApple } from "react-icons/fa";
import {useToast} from '@chakra-ui/react';
import { jwtDecode } from "jwt-decode";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const LoginForm = () => {
    let navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };
    const [showToast, setShowToast] = useState(false);
    const toast = useToast()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (values, { setSubmitting }) => {

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', values);
            console.log(response.data);
            toast({
                title: 'Login Successful',
                description: 'You have successfully logged in.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            console.error('Error during login:', error);
            toast({
                title: 'Login Failed',
                description: 'Please check your credentials and try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });

        }
        setSubmitting(false);
    };
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Formik initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string().trim().email().required('Email is a required field.'),
                    password: Yup.string()
                        .required('Password is a required field.')
                })}
                onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <MDBCard
                        className='shadow-5 text-center'
                        style={{
                            marginTop: '-130px',
                            margin: 'auto',
                            backdropFilter: 'blur(30px)',
                            borderRadius: '1rem',
                            maxWidth: '650px',
                        }}
                    >

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <MDBInput
                                label="Email"
                                type="email"
                            />
                            <MDBInput
                                label="Password"
                                type="password"
                            />
                            </Modal.Body>
                            <Button variant="light" type="submit">
                                Reset Password
                            </Button>
                        </Modal>

                        <MDBCardBody className='p-5 text-center'>
                            <h2 className='fw-bold text-black mb-5 text-center' style={{ marginTop: '-30px' }}>
                                Log In
                            </h2>
                            <MDBRow>
                                <MDBCol col='10' md='6'>
                                    <p className='text-black-50 mb-3'>Using social networking accounts</p>

                                    <MDBBtn outline rounded className='mb-3 w-100' color='danger'>
                                        <GoogleLogin
                                            onSuccess={credentialResponse => {
                                                const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
                                                console.log(credentialResponseDecoded);
                                                navigate("/home");
                                                window.location.reload();
                                            }}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                        />
                                    </MDBBtn>

                                    <MDBBtn outline rounded className='mb-3 w-100' size='lg'>
                                        <FaFacebook className="mb-1" style={{ width: '25px', height: '25px', marginLeft: '-40px' }}
                                                    appId="1320486661979779"
                                                    onSuccess={(response) => {
                                                        console.log('Login Success!', response);
                                                        navigate("/");
                                                        window.location.reload();
                                                    }}
                                                    onFail={(error) => {
                                                        console.log('Login Failed!', error);
                                                    }}
                                                    onProfileSuccess={(response) => {
                                                        console.log('Get Profile Success!', response);
                                                    }}
                                        />
                                        <span className="social-text">Sign in with Facebook</span>
                                    </MDBBtn>

                                    <MDBBtn outline rounded className='mb-3 w-100' size='lg' color='dark'>
                                        <FaApple className="mb-1" style={{ width: '25px', height: '25px', marginLeft: '-65px' }}/>
                                        <span className="social-text">Sign in with Apple</span>
                                    </MDBBtn>
                                </MDBCol>
                                <MDBCol col='6' md='6'>
                                    <p className='text-black-50 mb-3'>Using Money Lover account</p>
                                    <div>
                                        <Field
                                            as={MDBInput}
                                            wrapperClass='mb-4 w-100'
                                            label='Email address'
                                            id='formControlLgs'
                                            type='email'
                                            size='lg'
                                            name='email'
                                        />
                                        <div className=" small" style={{color: 'red',marginTop: '-20px'}}>
                                            <ErrorMessage name='email' component='span' />
                                        </div>

                                        <div>
                                            <Field
                                                as={MDBInput}
                                                wrapperClass='mb-4 w-100'
                                                label='Password'
                                                id='formControlLg'
                                                type={showPassword ? 'text' : 'password'}
                                                size='lg'
                                                name='password'
                                            />
                                            <div className=" small" style={{color: 'red',marginTop: '-20px'}}>
                                                <ErrorMessage name='password' component='span' />
                                            </div>
                                            <div style={{marginTop: 0,marginLeft: '95px'}}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="showPasswordCheckbox"
                                                    checked={showPassword}
                                                    onChange={togglePasswordVisibility}
                                                />

                                                <label className="form-check-label" htmlFor="showPasswordCheckbox">
                                                    Show Password
                                                </label>
                                            </div>
                                        </div>
                                        <div className="m-3" style={{ marginRight: 'auto' }}>
                                            <Link onClick={handleShow} style={{ color: 'green' }}>Forgot password?</Link>
                                        </div>
                                    </div>
                                    <MDBBtn className='w-100 mb-4' size='md' color='success' type='submit' disabled={isSubmitting}>
                                        {isSubmitting ? 'Logging in...' : 'LOGIN'}
                                    </MDBBtn>
                                    <p style={{ color: 'black' }}>
                                        Don't have an account? <Link to='/register' style={{ color: 'green' }}>Register here</Link>
                                    </p>

                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
