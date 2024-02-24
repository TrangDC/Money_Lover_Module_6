package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.TokenExpire;
import com.example.money_lover_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenExpireRepository extends JpaRepository<TokenExpire, Long> {
    Optional<TokenExpire> findByToken(String token);
}
