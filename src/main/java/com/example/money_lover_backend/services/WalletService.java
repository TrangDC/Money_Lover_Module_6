package com.example.money_lover_backend.services;

import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.repositories.WalletRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletService {
    @Autowired
    private WalletRepository walletRepository;

    @Transactional
    public void createWallet(Wallet wallet) {
        walletRepository.save(wallet);
    }
    public Wallet updateWallet(int walletId, Wallet updatedWallet) {
        Optional<Wallet> walletOptional = walletRepository.findById((long) walletId);
        if (walletOptional.isPresent()) {
            Wallet wallet = walletOptional.get();
            wallet.setWallet_name(updatedWallet.getWallet_name());
            wallet.setBalance(updatedWallet.getBalance());
            return walletRepository.save(wallet);
        } else {
            return null;
        }
    }
    public void deleteWallet(int walletId) {
        walletRepository.deleteById((long) walletId);
    }

}
