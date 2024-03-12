package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.Role;
import com.example.money_lover_backend.models.SharedWallets;
import com.example.money_lover_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SharedWalletsRepository extends JpaRepository<SharedWallets, Long> {
    List<SharedWallets> findAllByUser (User user);
}
