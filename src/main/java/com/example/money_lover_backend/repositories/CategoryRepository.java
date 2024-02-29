package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.models.category.DefaultCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    List<Category> findByNameContainingIgnoreCase(String name);

}
