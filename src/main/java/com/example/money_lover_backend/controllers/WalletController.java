package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.services.impl.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/wallets")
public class WalletController {
    @Autowired
    private WalletService walletService;

    @PostMapping("/saveWallet")
    public ResponseEntity<Wallet> saveWallet(@RequestBody Wallet wallet) {
        return new ResponseEntity<>(walletService.saveWallet(wallet), HttpStatus.CREATED);
    }

    // API gọi danh sách ví của 1 user
    @GetMapping("/user/{user_id}")
    public ResponseEntity<Iterable<Wallet>> getAllWalletByUser(@PathVariable String user_id) {
        List<Wallet> wallets = (List<Wallet>) walletService.getAllWalletByUserId(user_id);
        if (wallets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(wallets, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Iterable<Wallet>> getAllWallet() {
        List<Wallet> wallets = (List<Wallet>) walletService.getAllWallet();
        if (wallets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(wallets, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getWalletById(@PathVariable Long id) {
        return new ResponseEntity<>(walletService.getWalletById(id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteWallet/{id}")
    public ResponseEntity<?> deleteWallet(@PathVariable Long id) {
        walletService.deleteWallet(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editWallet(@RequestBody Wallet wallet, @PathVariable Long id) {
        return new ResponseEntity<>(walletService.editWallet(wallet, id), HttpStatus.OK);
    }

    @GetMapping("/searchWallet")
    public ResponseEntity<?> searchWalletByName(@RequestParam String nameWallet) {
        List<Wallet> wallets = walletService.searchWalletByName(nameWallet);
        return new ResponseEntity<>(wallets, HttpStatus.OK);
    }
}
