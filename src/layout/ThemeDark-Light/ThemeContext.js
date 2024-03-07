import React, { createContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import {MDBInput} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };

