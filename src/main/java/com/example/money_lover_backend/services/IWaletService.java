package com.example.money_lover_backend.services;

import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.Wallet;

import java.util.List;
import java.util.Optional;

public interface IWaletService{
    public Wallet saveWallet(Wallet wallet);

    public Iterable<Wallet> getAllWallet();

    Iterable<Wallet> searchWalletByName(String walletName);

    Optional<Wallet> getWalletById(Long id);

    public String deleteWallet(Long id);

    public Wallet editWallet(Wallet wallet,Long id);

    Iterable<Wallet> getAllWalletByUserId(String id);
}
