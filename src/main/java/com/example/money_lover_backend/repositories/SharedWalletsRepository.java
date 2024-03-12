package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.Role;
import com.example.money_lover_backend.models.SharedWallets;
import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SharedWalletsRepository extends JpaRepository<SharedWallets, Long> {
    List<SharedWallets> findAllByUser (User user);
    List<SharedWallets> findAllByWallet (Wallet wallet);

    Optional<SharedWallets> findByUserAndWallet (User user, Wallet wallet);
}
