import React from 'react';
import Header from "../../layout/Header/Header";
import SideBar from "../../layout/SideBar/SideBar";
import Main from "./Main/Main";
import Footer from "../../layout/Footer/Footer";
import './Home.css'; // Import CSS file for additional styling if needed

const Home = () => {
    return (
        <div className="grid-container">
            <div style={{backgroundColor: "#3498db"}} className="header">
                <Header/>
            </div>
            <div className="content-container">
                <div className="sidebar">
                    <SideBar/>
                </div>
                <div style={{backgroundColor: "#e74c3c"}} className="main">
                    <Main/>
                </div>
            </div>

            <div style={{backgroundColor: "#f39c12"}} className="footer">
                <Footer/>
            </div>
        </div>
    );
};

export default Home;
