import React, { createContext, useState, useContext } from 'react';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [selectedWalletId, setSelectedWalletId] = useState('all');

    return (
        <WalletContext.Provider value={{ selectedWalletId, setSelectedWalletId}}>
            {children}
        </WalletContext.Provider>
    );
};