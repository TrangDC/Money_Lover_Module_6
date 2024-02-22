package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.Wallet;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
public interface WalletRepository extends JpaRepository<Wallet, Long> {

}
