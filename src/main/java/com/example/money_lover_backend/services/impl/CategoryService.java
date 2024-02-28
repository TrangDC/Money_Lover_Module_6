package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.repositories.CategoryRepository;
import com.example.money_lover_backend.repositories.UserRepository;
import com.example.money_lover_backend.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Iterable<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void remove(Long id) {
        categoryRepository.deleteById(id);
    }
}
