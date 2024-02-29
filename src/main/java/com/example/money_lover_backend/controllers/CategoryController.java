package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.repositories.UserRepository;
import com.example.money_lover_backend.services.ICategoryService;
import com.example.money_lover_backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @Autowired
    private IUserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Iterable<Category>> findAll() {
        List<Category> categories = (List<Category>) categoryService.findAll();
        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findCategoryById(@PathVariable Long id) {
        Optional<Category> categoryOptional = categoryService.findById(id);
        if (!categoryOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categoryOptional.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> saveCategory(@RequestBody Category customer) {
        return new ResponseEntity<>(categoryService.save(customer), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Optional<Category> categoryOptional = categoryService.findById(id);
        if (!categoryOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        category.setId(categoryOptional.get().getId());
        return new ResponseEntity<>(categoryService.save(category), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
        Optional<Category> categoryOptional = categoryService.findById(id);
        if (!categoryOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        categoryService.remove(id);
        return new ResponseEntity<>(categoryOptional.get(), HttpStatus.OK);
    }


    //API lấy danh sách categories theo một user
    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> findCategoriesByUser(@PathVariable Long user_id) {
        Optional<User> userOptional = userService.findById(user_id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Iterable<Category> categories = userOptional.get().getCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    //API tạo mới một categories cho user
    @PostMapping("/user/{user_id}")
    public ResponseEntity<?> create(@PathVariable Long user_id,
                                    @RequestBody Category category) {
        Optional<User> userOptional = userService.findById(user_id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Category savedCategory = categoryService.save(category);

        List<Category> categories = userOptional.get().getCategories();
        categories.add(savedCategory);
        userOptional.get().setCategories(categories);
        userRepository.save(userOptional.get());
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }


}
