package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.models.SharedWallets;
import com.example.money_lover_backend.repositories.SharedWalletsRepository;
import com.example.money_lover_backend.services.IUserService;
import com.example.money_lover_backend.services.IWaletService;
import com.example.money_lover_backend.services.impl.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/shared_wallets")
public class SharedWalletController {

    @Autowired
    private SharedWalletsRepository sharedWalletsRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private IWaletService walletService;

    @GetMapping("/")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<Iterable<SharedWallets>> (sharedWalletsRepository.findAll(), HttpStatus.OK);
    }
}
