package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.enums.ERole;
import com.example.money_lover_backend.models.SharedWallets;
import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.payload.request.ShareWallet;
import com.example.money_lover_backend.repositories.SharedWalletsRepository;
import com.example.money_lover_backend.repositories.UserRepository;
import com.example.money_lover_backend.services.IUserService;
import com.example.money_lover_backend.services.IWaletService;
import com.example.money_lover_backend.services.impl.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/shared_wallets")
public class SharedWalletController {

    @Autowired
    private SharedWalletsRepository sharedWalletsRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IWaletService walletService;

    @GetMapping("/")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<Iterable<SharedWallets>> (sharedWalletsRepository.findAll(), HttpStatus.OK);
    }

    //API chia sẻ ví cho một user khác
    @PostMapping("/")
    public ResponseEntity<?> shareWallet(@RequestBody ShareWallet request) {
        String email = request.getEmail();
        ERole role = request.getRole();
        Long wallet_id = request.getWallet_id();

        Optional<User> memberOptional = userRepository.findByEmail(email);
        Optional<Wallet> walletOptional = walletService.getWalletById(wallet_id);

        if (memberOptional.isEmpty() || walletOptional.isEmpty()) {
            return new ResponseEntity<String>("Invalid user or wallet", HttpStatus.NOT_FOUND);
        }
        SharedWallets shareWallets = new SharedWallets();
        shareWallets.setWallet(walletOptional.get());
        shareWallets.setUser(memberOptional.get());
        shareWallets.setRole(role);

        List<SharedWallets> list = sharedWalletsRepository.findAll();
        for (SharedWallets data: list) {
            if (data.getWallet().equals(shareWallets.getWallet()) && data.getUser().equals(shareWallets.getUser())) {
                return new ResponseEntity<String>("User already shared this wallet", HttpStatus.BAD_REQUEST);
            }
        }
        sharedWalletsRepository.save(shareWallets);
        return new ResponseEntity<>(shareWallets, HttpStatus.OK);
    }

    //API ngừng chia sẻ ví cho một user
    @DeleteMapping("/user/{user_id}/unshared/{wallet_id}")
    public ResponseEntity<?> unsharedWallet(@PathVariable Long user_id,
                                            @PathVariable Long wallet_id) {
        Optional<User>userOptional = userService.findById(user_id);
        Optional<Wallet>walletOptional = walletService.getWalletById(wallet_id);
        if (userOptional.isEmpty() || walletOptional.isEmpty()) {
            return new ResponseEntity<String>("Invalid user", HttpStatus.NOT_FOUND);
        }
        Optional<SharedWallets> sharedWalletsOptional = sharedWalletsRepository.findByUserAndWallet(userOptional.get(), walletOptional.get());
        if (sharedWalletsOptional.isEmpty()) {
            return new ResponseEntity<String>("Invalid sharing", HttpStatus.NOT_FOUND);
        }
        sharedWalletsRepository.deleteById(sharedWalletsOptional.get().getId());
        return new ResponseEntity<String>("Unshared successfully", HttpStatus.OK);
    }

    //API xem danh sách member của 1 ví
    @GetMapping("/members/{wallet_id}")
    public ResponseEntity<?> getAllMemberByWallet(@PathVariable Long wallet_id) {
        Optional<Wallet>walletOptional = walletService.getWalletById(wallet_id);
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<String>("Invalid wallet", HttpStatus.NOT_FOUND);
        }
        List<SharedWallets> sharedWalletsList = sharedWalletsRepository.findAllByWallet(walletOptional.get());
        if (sharedWalletsList.isEmpty()) {
            return new ResponseEntity<Iterable<User>>(new ArrayList<>(), HttpStatus.OK);
        }
        List<User> members = new ArrayList<>();
        for (SharedWallets sharedWallet : sharedWalletsList) {
            User user = sharedWallet.getUser();
            members.add(user);
        }
        return new ResponseEntity<Iterable<User>>(members, HttpStatus.OK);
    }

    //API xem danh sách ví được share của 1 user
    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getWalletsByUser(@PathVariable Long user_id) {
        Optional<User>userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<String>("Invalid user", HttpStatus.NOT_FOUND);
        }
        List<SharedWallets> sharedWalletsList = sharedWalletsRepository.findAllByUser(userOptional.get());
        if (sharedWalletsList.isEmpty()) {
            return new ResponseEntity<Iterable<Wallet>>(new ArrayList<>(), HttpStatus.OK);
        }
        List<SharedWallets> result = new ArrayList<>();
        for (SharedWallets sharedWallet : sharedWalletsList) {
            Long id = sharedWallet.getId();
            Wallet wallet = sharedWallet.getWallet();
            ERole role = sharedWallet.getRole();
            SharedWallets data = new SharedWallets(id, wallet, role);
            result.add(data);
        }
        return new ResponseEntity<Iterable<SharedWallets>>(result, HttpStatus.OK);
    }
}
