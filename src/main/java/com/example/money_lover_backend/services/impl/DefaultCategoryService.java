package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.category.DefaultCategory;
import com.example.money_lover_backend.services.IDefaultCategoryService;

import java.util.Optional;

public class DefaultCategoryService implements IDefaultCategoryService {
    @Override
    public Iterable<DefaultCategory> findAll() {
        return null;
    }

    @Override
    public Optional<DefaultCategory> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public DefaultCategory save(DefaultCategory defaultCategory) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }
}
