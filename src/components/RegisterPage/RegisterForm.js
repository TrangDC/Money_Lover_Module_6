import React, {useState} from 'react';
import './register.css';
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import YupPassword from 'yup-password';
import axios from "axios";
import {FaApple, FaFacebook, FaGoogle} from "react-icons/fa";
import {useToast} from "@chakra-ui/react";
import {jwtDecode} from "jwt-decode";
import {GoogleLogin} from "@react-oauth/google";
YupPassword(Yup);

const RegisterForm = ({setIsLoading }) => {
    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const toast = useToast()

    const handleSubmit = async (values, {setSubmitting}) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', values)
            console.log(response.data);
            toast({
                title: 'Register Successful',
                description: 'Registered successfully, Log In now !',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            await axios.get(`http://localhost:8080/api/auth/active_account/${values.email}`);

            setTimeout(() => {
                setIsLoading(false)
                navigate('/active');
            }, 1000);

        } catch (error) {
            console.error('Error during login:', error);
            toast({
                title: 'Register Failed',
                description: 'Registration failed, register again !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false)
        }
        setSubmitting(false);
    };


    const handleGoogleRegister = async (credentialResponse) => {
        try {
            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
            console.log(credentialResponseDecoded);

            const email = credentialResponseDecoded.email;

            const password = generatePasswordFromEmail(email);

            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                email: email,
                password: password
            });

            console.log('Signup response:', response.data);
            await axios.get(`http://localhost:8080/api/auth/active_account/${email}`);

            setTimeout(async () => {
                await new Promise((resolve, reject) => {
                    localStorage.setItem('user', JSON.stringify(credentialResponseDecoded));
                    resolve();
                });
                navigate("/active");
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const generatePasswordFromEmail = (email) => {
        const password = email.substring(0, email.indexOf('@'));
        return password + '123456';
    };

    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('Email is a required field.').email(),
        password: Yup.string()
            .required('Password is a required field.')
            .min(8,'Password must contain 8 characters'
            )
    });

    const [showPassword, setShowPassword] = useState({ value: false });

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => ({
            value: !prevState.value
        }));
    };
    return (

        <Formik initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}>
            {({ errors, touched, isSubmitting }) => (
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
                        <MDBCardBody className='p-5 text-center'>
                            <div className="register-wrapper">
                                <h2 className='fw-bold text-black mb-5 text-center'>
                                    Register
                                </h2>
                            </div>
                            <MDBRow>
                                <MDBCol col='10' md='6' style={{marginTop: '5%'}}>
                                    <p className='text-black-50 mb-3'>Using social networking accounts</p>
                                    <MDBBtn outline rounded className='mb-3 w-100' size='lg' color='danger'>
                                        <GoogleLogin
                                            onSuccess={handleGoogleRegister}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                        />
                                    </MDBBtn>

                                    <MDBBtn outline rounded className='mb-3 w-100' size='lg'>
                                        <FaFacebook className="mb-1" style={{ width: '25px', height: '25px', marginLeft: '-40px' }}/>
                                        <span className="social-text">Sign in with Facebook</span>
                                    </MDBBtn>

                                    <MDBBtn outline rounded className='mb-3 w-100' size='lg' color='dark'>
                                        <FaApple className="mb-1" style={{ width: '25px', height: '25px', marginLeft: '-65px' }}/>
                                        <span className="social-text">Sign in with Apple</span>
                                    </MDBBtn>
                                </MDBCol>
                                <MDBCol col='6' md='6' style={{marginTop: '5%'}}>
                                    <p className='text-black-50 mb-3'>Create Money Lover account</p>
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
                                                type={showPassword.value ? 'text' : 'password'}
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
                                                    checked={showPassword.value}
                                                    onChange={togglePasswordVisibility}
                                                />
                                                <label className="form-check-label" htmlFor="showPasswordCheckbox">
                                                    Show Password
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                    <MDBBtn className='w-100 mb-4' size='md' color='success' type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Logging in...' : 'REGISTER'}
                                    </MDBBtn>
                                    <p style={{color: 'black'}}>
                                        Have you an account? <Link to="/login" style={{color: 'green'}}>Login here</Link>
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

export default RegisterForm;