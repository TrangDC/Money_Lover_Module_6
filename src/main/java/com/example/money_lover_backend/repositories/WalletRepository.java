package com.example.money_lover_backend.repositories;
import com.example.money_lover_backend.models.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {
    List<Wallet> findByNameContainingIgnoreCase(String walletName);
}
