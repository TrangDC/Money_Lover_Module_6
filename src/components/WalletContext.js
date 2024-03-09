import React, { createContext, useState, useContext } from 'react';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [selectedWalletId, setSelectedWalletId] = useState('all');
    const [wallet_list, setWalletList] = useState([]);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    return (
        <WalletContext.Provider value={{ selectedWalletId, setSelectedWalletId, wallet_list, setWalletList }}>
            {children}
        </WalletContext.Provider>
    );
};