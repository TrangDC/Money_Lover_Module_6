package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.TokenExpire;
import com.example.money_lover_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TokenExpireRepository extends JpaRepository<TokenExpire, Long> {
    Optional<TokenExpire> findByToken(String token);

    boolean existsByToken(String token);
}
