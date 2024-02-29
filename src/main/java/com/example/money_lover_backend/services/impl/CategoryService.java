package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.models.category.DefaultCategory;
import com.example.money_lover_backend.repositories.CategoryRepository;
import com.example.money_lover_backend.repositories.DefaultCategoryRepository;
import com.example.money_lover_backend.repositories.UserRepository;
import com.example.money_lover_backend.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DefaultCategoryRepository defaultCategoryRepository;
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

    @Override
    public Iterable<Category> createDefaultCategories() {
        List<DefaultCategory> defaultCategories = defaultCategoryRepository.findAll();

        List<Category> categories = defaultCategories.stream()
                .map(this::convertToCategory)
                .collect(Collectors.toList());

        categoryRepository.saveAll(categories);
        return categories;
    }

    private Category convertToCategory(DefaultCategory defaultCategory) {
        Category category = new Category();
        category.setName(defaultCategory.getName());
        category.setType(defaultCategory.getType());

        return category;
    }
}
