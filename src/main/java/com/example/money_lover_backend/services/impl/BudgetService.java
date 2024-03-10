package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.Budget;
import com.example.money_lover_backend.repositories.BudgetRepository;
import com.example.money_lover_backend.services.IBudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BudgetService implements IBudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Override
    public Iterable<Budget> findAll() {
        return budgetRepository.findAll();
    }

    @Override
    public Optional<Budget> findById(Long id) {
        return budgetRepository.findById(id);
    }

    @Override
    public Budget save(Budget budget) {
        return budgetRepository.save(budget);
    }

    @Override
    public void remove(Long id) {
        budgetRepository.deleteById(id);
    }
}
