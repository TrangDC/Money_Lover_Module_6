package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.services.ICategoryService;

import java.util.Optional;

public class CategoryService implements ICategoryService {
    @Override
    public Iterable<Category> findAll() {
        return null;
    }

    @Override
    public Optional<Category> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Category save(Category category) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }
}
