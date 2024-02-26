package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByActiveToken(String token);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    Boolean existsByActiveToken(String token);
}
