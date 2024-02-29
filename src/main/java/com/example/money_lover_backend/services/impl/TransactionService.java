package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.Transaction;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.repositories.TransactionRepository;
import com.example.money_lover_backend.services.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class TransactionService implements ITransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Override
    public Iterable<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    @Override
    public Optional<Transaction> findById(Long id) {
        return transactionRepository.findById(id);
    }

    @Override
    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public void remove(Long id) {
        transactionRepository.deleteById(id);
    }
}
