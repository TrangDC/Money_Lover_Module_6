package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.Transaction;
import com.example.money_lover_backend.services.ITransactionService;

import java.util.Optional;

public class TransactionService implements ITransactionService {
    @Override
    public Iterable<Transaction> findAll() {
        return null;
    }

    @Override
    public Optional<Transaction> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Transaction save(Transaction transaction) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }
}
