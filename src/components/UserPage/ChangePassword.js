import React from 'react';

import {
    MDBInput,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';
const ChangePassword = () => {
    return (
        <div  style={{position: "relative"}}>
            <form style={{position:"absolute", top: "250px", left: "50%", transform: "translate(-50%, -50%)"}}>
                <h4 style={{textAlign: "center"}}>Change Password</h4>

                <MDBCol col='12' md='12' style={{marginTop: "50px"}} >
                    <MDBInput className='mb-4' type='password' id='form1Example2' label='Enter old password' />
                    <MDBInput className='mb-4' type='password' id='form1Example2' label='Enter your new password' />
                    <MDBInput className='mb-4' type='password' id='form1Example2' label='Enter the password' />

                    <MDBBtn type='submit' block>
                        Submit
                    </MDBBtn>
                </MDBCol>
            </form>
        </div>
    );
};

export default ChangePassword;