package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.models.Transaction;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.services.ITransactionService;
import com.example.money_lover_backend.services.IWaletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transactions/")
public class TransactionController {

    @Autowired
    private ITransactionService transactionService;

    @Autowired
    private IWaletService waletService;

    //API thêm mới một khoản chi của 1 ví của 1 user


    //API xem chi tiết một khoản chi của 1 ví của 1 user


    //API xem toàn bộ khoản chi của 1 ví của 1 user
    @GetMapping("/user/{user_id}")
    public ResponseEntity<Iterable<Transaction>> findAll(@PathVariable String user_id) {
        Iterable<Wallet> wallets = waletService.getAllWalletByUserId(user_id);
        List<Transaction> list_transactions = new ArrayList<Transaction>();
        for (Wallet wallet: wallets) {
            Iterable<Transaction> transactions = transactionService.findAllByWallet(wallet);
            for (Transaction transaction : transactions) {
                list_transactions.add(transaction);
            }
        }
        return new ResponseEntity<Iterable<Transaction>>(list_transactions, HttpStatus.OK);
    }

    //API edit khoản chi của 1 ví của 1 user

    //API xóa khoản chi của 1 ví của 1 user
}
