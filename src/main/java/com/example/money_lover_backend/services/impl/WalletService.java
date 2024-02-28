package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.repositories.WalletRepository;
import com.example.money_lover_backend.services.IWaletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WalletService implements IWaletService {
    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserService userService;

    @Override
    public Wallet saveWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    @Override
    public Iterable<Wallet> getAllWallet() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        return walletRepository.findAll(sort);
    }
    @Override
    public List<Wallet> searchWalletByName(String walletName) {
        return walletRepository.findByNameContainingIgnoreCase(walletName);
    }

    @Override
    public Optional<Wallet> getWalletById(Long id) {
        return walletRepository.findById(id);
    }

    @Override
    public String deleteWallet(Long id) {
        Wallet wallet = walletRepository.findById(id).get();

        if (wallet != null) {
            walletRepository.delete(wallet);
            return "Wallet Delete Sucessfully";
        }
        return "Something wrong on server";
    }

    @Override
    public Wallet editWallet(Wallet wallet, Long id) {
        Wallet oldWallet = walletRepository.findById(id).get();
        oldWallet.setName(wallet.getName());
        oldWallet.setBalance(wallet.getBalance());

        return walletRepository.save(oldWallet);
    }

    @Override
    public Iterable<Wallet> getAllWalletByUserId(String id) {
        Optional<User> userOptional = userService.findById(Long.valueOf(id));
        if (!userOptional.isPresent()) {
            return null;
        }
        User user = userOptional.get();
        return user.getWallets();
    }

}
