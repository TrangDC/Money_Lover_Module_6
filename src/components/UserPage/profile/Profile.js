import React from 'react';
import './profile.css';
import {MDBInput} from "mdb-react-ui-kit";
const Profile = () => {
    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-75">
                        <div className="col col-lg-12 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div
                                        className="col-md-4 gradient-custom text-center text-white"
                                        style={{
                                            borderTopLeftRadius: ".5rem",
                                            borderBottomLeftRadius: ".5rem"
                                        }}
                                    >
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar"
                                            className="img-fluid my-5"
                                            style={{ width: 80 ,
                                                margin: "auto"}}
                                        />
                                        <h5>Marie Horwitz</h5>
                                        <p>Web Designer</p>
                                        <i className="far fa-edit mb-5" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h3>Information</h3>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <MDBInput label='Enter email' id='form1' type='text' />

                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Name</h6>
                                                    <MDBInput label='Enter name' id='form1' type='text' />
                                                </div>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>User Name</h6>
                                                <MDBInput label='User Name' id='form1' type='text' />

                                            </div>

                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="flex col-6 mb-3">
                                                    <button
                                                        type="submit" style={{marginTop: "30px", marginRight:"30px"}}
                                                        className="btn btn-success w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                    >
                                                        Submit
                                                    </button>
                                                    <button
                                                        type="submit" style={{marginTop: "30px"}}
                                                        className="btn btn-success w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Profile;
