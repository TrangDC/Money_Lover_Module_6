import React from 'react';

import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';

const ChangePassword = () => {
    return (
        <div>
            <form>
                <MDBCol col='6' md='6' style={{marginTop: "200px"}}>
                <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' />
                <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' />

                <MDBRow className='mb-4'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />
                    </MDBCol>
                    <MDBCol>
                        <a href='#!'>Forgot password?</a>
                    </MDBCol>
                </MDBRow>

                <MDBBtn type='submit' block>
                    Sign in
                </MDBBtn>
                </MDBCol>
            </form>
        </div>
    );
};

export default ChangePassword;