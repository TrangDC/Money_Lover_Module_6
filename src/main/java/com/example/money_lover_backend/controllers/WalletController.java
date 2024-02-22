package com.example.money_lover_backend.controllers;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.services.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/wallet")
@Service
public class WalletController {
  @Autowired
    private WalletService walletService;

//    public WalletController (WalletService walletService) {
//        this.walletService = walletService;
//    }

    @PostMapping("/createWallet") // thêm
    public ResponseEntity<Void> createWallet(@RequestBody Wallet wallet) {
        walletService.createWallet(wallet);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/walletId") //cập nhật
    public ResponseEntity<Wallet> updateWallet(@PathVariable("walletId") int walletId, @RequestBody Wallet updatedWallet) {
        Wallet wallet = walletService.updateWallet(walletId, updatedWallet);
        if (wallet != null) {
            return new ResponseEntity<>(wallet, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/walletId") // xóa
    public ResponseEntity<Void> deleteWallet(@PathVariable("walletId") int walletId) {
        walletService.deleteWallet(walletId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
