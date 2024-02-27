package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.models.category.DefaultCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DefaultCategoryRepository extends JpaRepository<DefaultCategory,Long> {
    List<DefaultCategory> findByNameContainingIgnoreCase(String name);
}