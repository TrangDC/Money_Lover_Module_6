package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.Transaction;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.models.category.DefaultCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {
    List<Transaction> findByNoteContainingIgnoreCase (String text);

    List<Transaction> findByWallet(Wallet wallet);

    List<Transaction> findAllByTransactionDateBetween(LocalDate start, LocalDate end);
    List<Transaction> findAllByTransactionDate(LocalDate Date);
}
