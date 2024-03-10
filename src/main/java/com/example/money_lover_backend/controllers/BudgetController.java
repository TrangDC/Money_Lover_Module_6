package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.models.Budget;
import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.payload.request.BudgetTimeRange;
import com.example.money_lover_backend.payload.request.CreateBudget;
import com.example.money_lover_backend.repositories.BudgetRepository;
import com.example.money_lover_backend.services.impl.BudgetService;
import com.example.money_lover_backend.services.impl.CategoryService;
import com.example.money_lover_backend.services.impl.UserService;
import com.example.money_lover_backend.services.impl.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequestMapping("/api/budgets")
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private BudgetRepository budgetRepository;

    //API tạo mới một budget
    @PostMapping("/")
    public ResponseEntity<?> createBudget(@RequestBody CreateBudget createBudget) {
        Optional<User> userOptional = userService.findById(createBudget.getUser_id());
        Optional<Category> categoryOptional = categoryService.findById(createBudget.getCategory_id());
        Optional<Wallet> walletOptional = walletService.getWalletById(createBudget.getWallet_id());

        if (userOptional.isEmpty() || categoryOptional.isEmpty() || walletOptional.isEmpty()) {
            return new ResponseEntity<String>("Invalid data",HttpStatus.NOT_FOUND);
        }
        Budget budget = new Budget();
        budget.setWallet(walletOptional.get());
        budget.setCategory(categoryOptional.get());
        budget.setName(categoryOptional.get().getName());
        budget.setAmount(createBudget.getAmount());
        budget.setStartDate(createBudget.getStartDate());
        budget.setEndDate(createBudget.getEndDate());

        List<Budget> budgetList = userOptional.get().getBudgets();
        // Check for overlapping time ranges
        if (isTimeRangeOverlapping(userOptional.get(), categoryOptional.get(), createBudget.getStartDate(), createBudget.getEndDate())) {
            return ResponseEntity.badRequest().body("Unaccepted time range!");
        }

        budgetList.add(budget);

        userService.save(userOptional.get());
        budgetService.save(budget);

        return new ResponseEntity<String>("Create budget successfully", HttpStatus.OK);
    }

    private boolean isTimeRangeOverlapping(User user, Category category, LocalDate newStartDate, LocalDate newEndDate) {
        for (Budget oldBudget : user.getBudgets()) {
            if (oldBudget.getCategory().equals(category)) {
                LocalDate oldStartDate = oldBudget.getStartDate();
                LocalDate oldEndDate = oldBudget.getEndDate();

                if ((newStartDate.isBefore(oldEndDate) || newStartDate.equals(oldEndDate)) && newEndDate.isAfter(oldStartDate)) {
                    return true; // Overlapping time range found
                }
            }
        }
        return false; // No overlapping time range found
    }


    //API xem danh sách budget của 1 user
    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> findAll(@PathVariable String user_id) {
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isPresent()) {
            return new ResponseEntity<Iterable<Budget>>(userOptional.get().getBudgets(), HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
    }


    //Kiểm tra budget dưới 20%
    @PostMapping("/check")
    public ResponseEntity<?> checkBudgetWithinTimeRange(@RequestBody BudgetTimeRange request) {
        Optional<Category> categoryOptional = categoryService.findById(request.getCategory_id());
        Optional<Wallet> walletOptional = walletService.getWalletById(request.getWallet_id());

        if (categoryOptional.isEmpty() || walletOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Category category = categoryOptional.get();
        Wallet wallet = walletOptional.get();

        List<Budget> budgets = budgetRepository.findAll();
        for (Budget budget : budgets) {
            LocalDate startDate = budget.getStartDate();
            LocalDate endDate = budget.getEndDate();
            if((request.getStartDate().equals(startDate) || request.getStartDate().isAfter(startDate))
                && (request.getStartDate().equals(endDate) || request.getStartDate().isBefore(endDate))) {



                return new ResponseEntity<>(budget, HttpStatus.OK);
            }
        }
        return ResponseEntity.notFound().build();
    }


    //API sửa một budget


    //API xóa một budget

}
