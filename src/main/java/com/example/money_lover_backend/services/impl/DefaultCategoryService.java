package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.models.category.DefaultCategory;
import com.example.money_lover_backend.repositories.CategoryRepository;
import com.example.money_lover_backend.repositories.DefaultCategoryRepository;
import com.example.money_lover_backend.services.ICategoryService;
import com.example.money_lover_backend.services.IDefaultCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DefaultCategoryService implements IDefaultCategoryService {

    @Autowired
    private DefaultCategoryRepository defaultCategoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Iterable<DefaultCategory> findAll() {
        return defaultCategoryRepository.findAll();
    }

    @Override
    public Optional<DefaultCategory> findById(Long id) {
        return defaultCategoryRepository.findById(id);
    }

    @Override
    public DefaultCategory save(DefaultCategory defaultCategory) {
        return defaultCategoryRepository.save(defaultCategory);
    }

    @Override
    public void remove(Long id) {
        defaultCategoryRepository.deleteById(id);
    }

}
