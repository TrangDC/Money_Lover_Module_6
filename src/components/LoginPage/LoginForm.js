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
import {useDisclosure, useToast} from '@chakra-ui/react';
import { jwtDecode } from "jwt-decode";
import Button from 'react-bootstrap/Button';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'


const LoginForm = ({ handleLoginSuccess, setIsLoading  }) => {


    let navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };
    const toast = useToast()

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', values);
            localStorage.setItem("user", JSON.stringify(response.data));
            handleLoginSuccess();
            console.log(response.data);
            toast({
                title: 'Login Successful',
                description: 'You have successfully logged in.',
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
            setTimeout(() => {
                setIsLoading(false);
                navigate('/auth/transactions');
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
            setIsLoading(false);
        }

        setSubmitting(false);
    };


    const handleGoogleLogin = async (credentialResponse) => {

        try {
            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
            console.log(credentialResponseDecoded);

            const email = credentialResponseDecoded.email;
            const password = generatePasswordFromEmail(email);

            const response = await axios.post('http://localhost:8080/api/auth/google_signin', {
                email: email,
                password: password
            });

            console.log(response.data);

            if (response) {
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        localStorage.setItem('user', JSON.stringify(response.data));
                        resolve();
                    }, 1000);
                });
                handleLoginSuccess();
                toast({
                    title: 'Login Successful',
                    description: 'You have successfully logged in.',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });

                setTimeout(() => {
                    navigate("/auth/transactions");
                }, 1000);
            } else {
                toast({
                    title: 'Login Failed',
                    description: 'Please check your credentials and try again.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                console.log('Email does not match or user does not exist.');
            }
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
    };

    const generatePasswordFromEmail = (email) => {
        const username = email.substring(0, email.indexOf('@'));
        return username + '123456';
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { isOpen, onOpen, onClose } = useDisclosure()


    //Method get password
    const [recoverEmail, setRecoverEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const handleChangeEmail = (event) => {
        setRecoverEmail(event.target.value);
    };

    const resetForm = () => {
        setRecoverEmail('');
        setIsEmailSent(false);
    };

    const handleSend = () => {
        axios.get(`http://localhost:8080/api/auth/forgot_password/${recoverEmail}`).then(r => {
            console.log(r.data);
            setIsEmailSent(true);
        }).catch((e) => {
            console.log(e)
        })
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

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>GET PASSWORD</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    { isEmailSent ? (
                                        <>
                                            <p>Email has been sent!</p>
                                        </>
                                    ) : (
                                        <>
                                            <FormControl isRequired>
                                                <FormLabel>Email</FormLabel>
                                                <Input placeholder='Enter Email' value={recoverEmail} onChange={handleChangeEmail}/>
                                            </FormControl>
                                        </>
                                    )
                                    }

                                </ModalBody>
                                <ModalFooter>
                                    {!isEmailSent ? (
                                        <Button colorScheme='blue' mr={3} onClick={handleSend}>
                                            Submit
                                        </Button>
                                    ) : (
                                        <ModalCloseButton />
                                    )}
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <MDBCardBody className='p-5 text-center'>
                            <div className="login-wrapper">
                                <h2 className='fw-bold text-black mb-5 text-center'>
                                    Log In
                                </h2>
                            </div>
                            <MDBRow>
                                <MDBCol col='10' md='6' style={{marginTop: '5%'}}>
                                    <p className='text-black-50 mb-3'>Using social networking accounts</p>

                                    <MDBBtn outline rounded className='mb-3 w-100' color='danger'>
                                        <GoogleLogin
                                            onSuccess={handleGoogleLogin}
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
                                <MDBCol col='6' md='6' style={{marginTop: '5%'}}>
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
                                            <Link onClick={onOpen} style={{ color: 'green' }}>Forgot password?</Link>
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