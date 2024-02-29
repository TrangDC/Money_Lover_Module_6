package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.enums.Type;
import com.example.money_lover_backend.models.Transaction;
import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.payload.request.CreateTransaction;
import com.example.money_lover_backend.payload.response.MessageResponse;
import com.example.money_lover_backend.repositories.UserRepository;
import com.example.money_lover_backend.repositories.WalletRepository;
import com.example.money_lover_backend.services.ICategoryService;
import com.example.money_lover_backend.services.ITransactionService;
import com.example.money_lover_backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private ITransactionService transactionService;

    @Autowired
    private IUserService userService;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<Iterable<Transaction>> findAll() {
        List<Transaction> transactions = (List<Transaction>) transactionService.findAll();
        if (transactions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Transaction> saveTransaction(@RequestBody Transaction transaction) {
        return new ResponseEntity<>(transactionService.save(transaction), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        Optional<Transaction> transactionOptional = transactionService.findById(id);
        if (transactionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        transaction.setId(transactionOptional.get().getId());
        return new ResponseEntity<>(transactionService.save(transaction), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Transaction> deleteTransaction(@PathVariable Long id) {
        Optional<Transaction> transactionOptional = transactionService.findById(id);
        if (transactionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        transactionService.remove(id);
        return new ResponseEntity<>(transactionOptional.get(), HttpStatus.OK);
    }

    //API hiển thị danh sách giao dịch theo user
    @GetMapping("/user/{user_id}")
    public ResponseEntity<Iterable<Transaction>> findAll(@PathVariable Long user_id) {
        Optional<User> userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Transaction> transactions = userOptional.get().getTransactions();
        if (transactions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    //API tạo mới một giao dịch expense hoặc income
    @PostMapping("/user/{user_id}/expense_income")
    public ResponseEntity<?> create(@PathVariable Long user_id, @RequestBody CreateTransaction createTransaction) {
        Optional<User> userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Transaction transaction = buildTransactionFromRequest(createTransaction);
        if (transaction == null) {
            return ResponseEntity.badRequest().body("Error: Invalid request data!");
        }

        Wallet wallet = getWalletFromTransaction(createTransaction);
        if (wallet == null) {
            return new  ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }


        Category category = getCategoryFromTransaction(createTransaction);
        if (category == null) {
            return new  ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        if (!isCategoryValidForUser(category, userOptional.get())) {
            return new  ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        updateWalletBalance(wallet, createTransaction.getAmount(), category.getType());
        transaction.setWallet(wallet);
        transaction.setCategory(category);
        Transaction savedTransaction = transactionService.save(transaction);
        List<Transaction> transactions = userOptional.get().getTransactions();
        transactions.add(savedTransaction);
        userOptional.get().setTransactions(transactions);
        userService.save(userOptional.get());
        return ResponseEntity.ok(transactions);
    }

    private Transaction buildTransactionFromRequest(CreateTransaction createTransaction) {
        Transaction transaction = new Transaction();
        transaction.setAmount(createTransaction.getAmount());
        transaction.setNote(createTransaction.getNote());
        transaction.setTransactionDate(createTransaction.getTransactionDate());
        return transaction;
    }

    private Wallet getWalletFromTransaction(CreateTransaction createTransaction) {
        Optional<Wallet> walletOptional = walletRepository.findById(createTransaction.getWallet_id());
        return walletOptional.orElse(null);
    }

    private Category getCategoryFromTransaction(CreateTransaction createTransaction) {
        Optional<Category> categoryOptional = categoryService.findById(createTransaction.getCategory_id());
        return categoryOptional.orElse(null);
    }

    private boolean isCategoryValidForUser(Category category, User user) {
        return user.getCategories().contains(category)
                && (category.getType() == Type.EXPENSE || category.getType() == Type.INCOME);
    }

    private void updateWalletBalance(Wallet wallet, Long amount, Type categoryType) {
        if (categoryType == Type.INCOME) {
            wallet.setBalance(wallet.getBalance() + amount);
        } else {
            wallet.setBalance(wallet.getBalance() - amount);
        }
    }


    //API tạo mới một giao dịch debt hoặc loan
    @PostMapping("/user/{user_id}/debt_loan")
    public ResponseEntity<?> create_debt_loan(@PathVariable Long user_id,
                                              @RequestBody CreateTransaction createTransaction) {
        Optional<User> userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ResponseEntity<?> dateValidationResponse = validateDates(createTransaction.getTransactionDate(), createTransaction.getEndDate());
        if (dateValidationResponse != null) {
            return dateValidationResponse;
        }

        ResponseEntity<?> walletResponse = validateWallet(createTransaction);
        if (walletResponse != null) {
            return walletResponse;
        }

        ResponseEntity<?> categoryResponse = validateCategory(userOptional.get(), createTransaction);
        if (categoryResponse != null) {
            return categoryResponse;
        }

        updateWalletAndSaveTransaction(userOptional.get(), createTransaction);

        return ResponseEntity.ok(userOptional.get().getTransactions());
    }

    private ResponseEntity<?> validateDates(LocalDate transactionDate, LocalDate endDate) {
        if (endDate.isBefore(transactionDate)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: endDate must be after transactionDate"));
        }
        return null;
    }

    private ResponseEntity<?> validateWallet(CreateTransaction createTransaction) {
        Long walletId = createTransaction.getWallet_id();
        Optional<Wallet> walletOptional = walletRepository.findById(walletId);
        if (walletOptional.isEmpty()) {
            return new  ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        return null;
    }

    private ResponseEntity<?> validateCategory(User user, CreateTransaction createTransaction) {
        Long categoryId = createTransaction.getCategory_id();
        Optional<Category> categoryOptional = categoryService.findById(categoryId);
        if (categoryOptional.isEmpty() || !user.getCategories().contains(categoryOptional.get())) {
            return new  ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        Category category = categoryOptional.get();
        if (category.getType() != Type.LOAN && category.getType() != Type.DEBT) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Category invalid!"));
        }

        return null;
    }

    private void updateWalletAndSaveTransaction(User user, CreateTransaction createTransaction) {
        Wallet wallet = walletRepository.findById(createTransaction.getWallet_id()).orElseThrow();
        Long amount = createTransaction.getAmount();
        Category category = categoryService.findById(createTransaction.getCategory_id()).orElseThrow();

        if (category.getType() == Type.DEBT) {
            wallet.setBalance(wallet.getBalance() + amount);
        } else {
            wallet.setBalance(wallet.getBalance() - amount);
        }

        Transaction transaction = buildTransactionFromRequest(createTransaction, category);
        transaction.setWallet(wallet);
        user.getTransactions().add(transaction);
        userService.save(user);
    }

    private Transaction buildTransactionFromRequest(CreateTransaction createTransaction, Category category) {
        Transaction transaction = new Transaction();
        transaction.setAmount(createTransaction.getAmount());
        transaction.setNote(createTransaction.getNote());
        transaction.setTransactionDate(createTransaction.getTransactionDate());
        transaction.setEndDate(createTransaction.getEndDate());
        if (category.getType() == Type.DEBT) {
            transaction.setLender(createTransaction.getLender());
        } else {
            transaction.setBorrower(createTransaction.getBorrower());
        }
        transaction.setCategory(category);
        return transaction;
    }

    //API xóa một giao dịch theo user
    @DeleteMapping("/user/{user_id}/transaction/{transaction_id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long user_id, @PathVariable Long transaction_id) {
        Optional<User> userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Transaction> transactionOptional = transactionService.findById(transaction_id);
        if (transactionOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Transaction transaction = transactionOptional.get();
        Wallet wallet = transaction.getWallet();
        Long amount = transaction.getAmount();
        Type categoryType = transaction.getCategory().getType();

        if (categoryType == Type.EXPENSE || categoryType == Type.DEBT) {
            wallet.setBalance(wallet.getBalance() + amount);
        } else if (categoryType == Type.INCOME || categoryType == Type.LOAN) {
            wallet.setBalance(wallet.getBalance() - amount);
        }

        userOptional.get().getTransactions().remove(transaction);
        transactionService.remove(transaction_id);
        userService.save(userOptional.get());

        return ResponseEntity.ok("Transaction deleted successfully");
    }



}
