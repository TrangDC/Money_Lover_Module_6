package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.enums.Type;
import com.example.money_lover_backend.models.Transaction;
import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.payload.request.CreateTransaction;
import com.example.money_lover_backend.payload.response.MessageResponse;
import com.example.money_lover_backend.repositories.TransactionRepository;
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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private ITransactionService transactionService;

    @Autowired
    private TransactionRepository transactionRepository;

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
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Transaction transaction = buildTransactionFromRequest(createTransaction);
        if (transaction == null) {
            return ResponseEntity.badRequest().body("Error: Invalid request data!");
        }

        Wallet wallet = getWalletFromTransaction(createTransaction);
        if (wallet == null) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }


        Category category = getCategoryFromTransaction(createTransaction);
        if (category == null) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        if (!isCategoryValidForUser(category, userOptional.get())) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
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
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Transaction transaction = new Transaction();
        transaction.setAmount(createTransaction.getAmount());
        transaction.setNote(createTransaction.getNote());
        transaction.setTransactionDate(createTransaction.getTransactionDate());
        transaction.setEndDate(createTransaction.getEndDate());
        if (createTransaction.getEndDate().isBefore(createTransaction.getTransactionDate())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: endDate must be after transactionDate"));
        }

        //Tìm và lấy thông tin wallet
        Long wallet_id = createTransaction.getWallet_id();
        Optional<Wallet> walletOptional = walletRepository.findById(wallet_id);
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        transaction.setWallet(walletOptional.get());

        //Tìm và lấy thông tin category
        Long category_id = createTransaction.getCategory_id();
        Optional<Category> categoryOptional = categoryService.findById(category_id);
        if (categoryOptional.isEmpty()) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        //Kiểm tra category có thuộc danh mục của user
        List<Category> categories = userOptional.get().getCategories();
        if (!categories.contains(categoryOptional.get())) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        //Kiểm tra danh mục có phải EXPENSE và INCOME hay không
        String type = String.valueOf(categoryOptional.get().getType());
        if (!type.equals("LOAN") && !type.equals("DEBT")) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Category invalid!"));
        }
        Wallet wallet = walletOptional.get();
        Long amount = createTransaction.getAmount();
        if (type.equals("DEBT")) {
            wallet.setBalance(wallet.getBalance() + amount);
            transaction.setLender(createTransaction.getLender());
        } else {
            wallet.setBalance(wallet.getBalance() - amount);
            transaction.setBorrower(createTransaction.getBorrower());
        }
        transaction.setCategory(categoryOptional.get());

        Transaction savedTransaction = transactionService.save(transaction);
        List<Transaction> transactions = userOptional.get().getTransactions();
        transactions.add(savedTransaction);
        userOptional.get().setTransactions(transactions);
        userService.save(userOptional.get());
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }


    //API xóa một giao dịch theo user
    @DeleteMapping("/user/{user_id}/transaction/{transaction_id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long user_id, @PathVariable Long transaction_id) {
        Optional<User> userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<Transaction> transactionOptional = transactionService.findById(transaction_id);
        if (transactionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

    @PutMapping("/user/{user_id}/transaction/{transaction_id}")
    public ResponseEntity<?> redoTransaction(@PathVariable Long user_id, @PathVariable Long transaction_id) {
        Optional<User> userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<Transaction> transactionOptional = transactionService.findById(transaction_id);
        if (transactionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

        // Set transaction fields to null
        transaction.setWallet(null);
        transaction.setAmount(null);
        transaction.setCategory(null);

        // Instead of removing transaction, update it
        transactionService.save(transaction);

        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }


    //API update mới một giao dịch expense hoặc income
    @PutMapping("/user/{user_id}/expense_income/{transaction_id}")
    public ResponseEntity<?> updateIncome_Expense(@PathVariable Long user_id,
                                                  @PathVariable Long transaction_id,
                                                  @RequestBody CreateTransaction createTransaction) {
        Optional<User> userOptional = userService.findById(user_id);
        Optional<Transaction> transactionOptional = transactionService.findById(transaction_id);
        if (userOptional.isEmpty() || transactionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Transaction transaction = buildTransactionFromRequest(createTransaction);
        if (transaction == null) {
            return ResponseEntity.badRequest().body("Error: Invalid request data!");
        }

        Wallet wallet = getWalletFromTransaction(createTransaction);
        if (wallet == null) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }


        Category category = getCategoryFromTransaction(createTransaction);
        if (category == null) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        if (!isCategoryValidForUser(category, userOptional.get())) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        updateWalletBalance(wallet, createTransaction.getAmount(), category.getType());
        transaction.setWallet(wallet);
        transaction.setCategory(category);
        transaction.setId(transactionOptional.get().getId());
        Transaction savedTransaction = transactionService.save(transaction);
        return ResponseEntity.ok(savedTransaction);
    }

    //API update mới một giao dịch debt hoặc loan
    @PutMapping("/user/{user_id}/debt_loan/{transaction_id}")
    public ResponseEntity<?> update_debt_loan(@PathVariable Long user_id,
                                              @PathVariable Long transaction_id,
                                              @RequestBody CreateTransaction createTransaction) {
        Optional<User> userOptional = userService.findById(user_id);
        Optional<Transaction> transactionOptional = transactionService.findById(transaction_id);
        if (userOptional.isEmpty() || transactionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Transaction transaction = new Transaction();
        transaction.setAmount(createTransaction.getAmount());
        transaction.setNote(createTransaction.getNote());
        transaction.setTransactionDate(createTransaction.getTransactionDate());
        transaction.setEndDate(createTransaction.getEndDate());
        if (createTransaction.getEndDate().isBefore(createTransaction.getTransactionDate())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: endDate must be after transactionDate"));
        }

        Long wallet_id = createTransaction.getWallet_id();
        Optional<Wallet> walletOptional = walletRepository.findById(wallet_id);
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        transaction.setWallet(walletOptional.get());

        Long category_id = createTransaction.getCategory_id();
        Optional<Category> categoryOptional = categoryService.findById(category_id);
        if (categoryOptional.isEmpty()) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        List<Category> categories = userOptional.get().getCategories();
        if (!categories.contains(categoryOptional.get())) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        String type = String.valueOf(categoryOptional.get().getType());
        if (!type.equals("LOAN") && !type.equals("DEBT")) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Category invalid!"));
        }
        Wallet wallet = walletOptional.get();
        Long amount = createTransaction.getAmount();
        if (type.equals("DEBT")) {
            wallet.setBalance(wallet.getBalance() + amount);
            transaction.setLender(createTransaction.getLender());
        } else {
            wallet.setBalance(wallet.getBalance() - amount);
            transaction.setBorrower(createTransaction.getBorrower());
        }
        transaction.setCategory(categoryOptional.get());
        transaction.setId(transactionOptional.get().getId());

        Transaction savedTransaction = transactionService.save(transaction);
        return new ResponseEntity<>(savedTransaction, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch dựa theo 1 ví hoặc tất cả
    @GetMapping("/user/{user_id}/wallet/{wallet_id}")
    public ResponseEntity<Iterable<Transaction>> findAllByWallet(@PathVariable Long user_id,
                                                         @PathVariable String wallet_id) {
        Optional<User> userOptional = userService.findById(user_id);
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (userOptional.isEmpty() && walletOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (wallet_id.isEmpty() || wallet_id.equals("all")) {
            List<Transaction> transactions = userOptional.get().getTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        }
        List<Transaction> transactions = transactionRepository.findByWallet(walletOptional.get());
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }



    //Lấy danh sách giao dịch theo tháng năm hiện tại
    @GetMapping("/user/{user_id}/current_month_transactions")
    public ResponseEntity<Iterable<Transaction>> findAllByCurrentMonth(@PathVariable Long user_id) {
        Optional<User> userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        LocalDate currentDate = LocalDate.now();
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();

        LocalDate startDate = LocalDate.of(currentYear, currentMonth, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();
        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch theo tháng năm được chọn
    @GetMapping("/user/{user_id}/transactions/{year}/{monthIndex}")
    public ResponseEntity<?> findAllByYearAndMonthIndex(@PathVariable Long user_id,
                                                        @PathVariable int year,
                                                        @PathVariable int monthIndex) {

        if (monthIndex < 0 || monthIndex > 11 || year <= 0) {
            return new ResponseEntity<>("Invalid month index or year", HttpStatus.BAD_REQUEST);
        }

        Optional<User> userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        int month = monthIndex + 1;
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();
        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
