package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.Transaction;
import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.models.category.DefaultCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {
    List<Transaction> findByNoteContainingIgnoreCase (String text);
}
