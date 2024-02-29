package com.example.money_lover_backend.controllers;

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


    @GetMapping("/{id}")
    public ResponseEntity<Transaction> findTransactionById(@PathVariable Long id) {
        Optional<Transaction> transactionOptional = transactionService.findById(id);
        if (!transactionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(transactionOptional.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Transaction> saveTransaction(@RequestBody Transaction transaction) {
        return new ResponseEntity<>(transactionService.save(transaction), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        Optional<Transaction> transactionOptional = transactionService.findById(id);
        if (!transactionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        transaction.setId(transactionOptional.get().getId());
        return new ResponseEntity<>(transactionService.save(transaction), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Transaction> deleteTransaction(@PathVariable Long id) {
        Optional<Transaction> transactionOptional = transactionService.findById(id);
        if (!transactionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        transactionService.remove(id);
        return new ResponseEntity<>(transactionOptional.get(), HttpStatus.OK);
    }

    //API hiển thị khoản chi tiêu theo user
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

    //API tạo mới một khoản chi
    @PostMapping("/user/{user_id}/expense_income")
    public ResponseEntity<?> create(@PathVariable Long user_id,
                                    @RequestBody CreateTransaction createTransaction) {
        Optional<User> userOptional = userService.findById(user_id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Transaction transaction = new Transaction();
        transaction.setAmount(createTransaction.getAmount());
        transaction.setNote(createTransaction.getNote());
        transaction.setTransactionDate(createTransaction.getTransactionDate());

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

        //Kiểm tra danh mục có phải EXPENSE hay không
        transaction.setCategory(categoryOptional.get());
        String type = String.valueOf(categoryOptional.get().getType());
        if (!type.equals("EXPENSE") && !type.equals("INCOME")) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Category invalid!"));
        }
        Wallet wallet = walletOptional.get();
        Long amount = createTransaction.getAmount();
        if (type.equals("INCOME")) {
            //Cộng thêm số tiền trong ví
            wallet.setBalance(wallet.getBalance() + amount);
        } else {
            //Trừ đi số tiền trong ví
            wallet.setBalance(wallet.getBalance() - amount);
        }
        Transaction savedTransaction = transactionService.save(transaction);
        List<Transaction> transactions = userOptional.get().getTransactions();
        transactions.add(savedTransaction);
        userOptional.get().setTransactions(transactions);
        userService.save(userOptional.get());
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

}
