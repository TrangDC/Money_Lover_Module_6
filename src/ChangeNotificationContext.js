import React, { createContext, useContext, useState } from 'react';

const ChangeNotificationContext = createContext();

export const useChangeNotification = () => useContext(ChangeNotificationContext);

export const ChangeNotificationProvider = ({ children }) => {
    const [transactionChanged, setTransactionChanged] = useState(false);
    const [walletChanged, setWalletChanged] = useState(false);

    const notifyTransactionChange = () => setTransactionChanged(prev => !prev);
    const notifyWalletChange = () => setWalletChanged(prev => !prev);

    return (
        <ChangeNotificationContext.Provider value={{ notifyTransactionChange, notifyWalletChange, transactionChanged, walletChanged }}>
            {children}
        </ChangeNotificationContext.Provider>
    );
};