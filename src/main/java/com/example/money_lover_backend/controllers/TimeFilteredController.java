package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.models.Transaction;
import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.payload.request.FindByDay;
import com.example.money_lover_backend.payload.request.FindByWeek;
import com.example.money_lover_backend.repositories.TransactionRepository;
import com.example.money_lover_backend.repositories.WalletRepository;
import com.example.money_lover_backend.services.ICategoryService;
import com.example.money_lover_backend.services.ITransactionService;
import com.example.money_lover_backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/time_filter")
public class TimeFilteredController {
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

    //Lấy danh sách giao dịch income theo tháng năm hiện tại và ví
    @GetMapping("/user/{user_id}/income_transaction/{wallet_id}/date/{year}/{monthIndex}")
    public ResponseEntity<?> findIncomeTransactionsByWalletAndDate(@PathVariable String user_id,
                                                                   @PathVariable String wallet_id,
                                                                   @PathVariable String year,
                                                                   @PathVariable String monthIndex){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("INCOME")) {
                    incomeTransactions.add(transaction);
                }
            }
            int month = Integer.parseInt(monthIndex) + 1;
            LocalDate startDate = LocalDate.of(Integer.parseInt(year), month, 1);
            LocalDate endDate = startDate.plusMonths(1).minusDays(1);

            List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("INCOME")) {
                incomeTransactionList.add(transaction);
            }
        }
        int month = Integer.parseInt(monthIndex) + 1;
        LocalDate startDate = LocalDate.of(Integer.parseInt(year), month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch expense theo tháng năm hiện tại và ví
    @GetMapping("/user/{user_id}/expense_transaction/{wallet_id}/date/{year}/{monthIndex}")
    public ResponseEntity<?> findExpenseTransactionsByWalletAndDate(@PathVariable String user_id,
                                                                    @PathVariable String wallet_id,
                                                                    @PathVariable String year,
                                                                    @PathVariable String monthIndex){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("EXPENSE")) {
                    incomeTransactions.add(transaction);
                }
            }
            int month = Integer.parseInt(monthIndex) + 1;
            LocalDate startDate = LocalDate.of(Integer.parseInt(year), month, 1);
            LocalDate endDate = startDate.plusMonths(1).minusDays(1);

            List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("EXPENSE")) {
                incomeTransactionList.add(transaction);
            }
        }
        int month = Integer.parseInt(monthIndex) + 1;
        LocalDate startDate = LocalDate.of(Integer.parseInt(year), month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch income theo ngày
    @PostMapping("/user/{user_id}/income_transaction/{wallet_id}/day")
    public ResponseEntity<?> findIncomeTransactionsByDay(@PathVariable String user_id,
                                                         @PathVariable String wallet_id,
                                                         @RequestBody FindByDay day){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("INCOME")) {
                    incomeTransactions.add(transaction);
                }
            }

            List<Transaction> transactions = transactionRepository.findAllByTransactionDate(day.getTransactionDate());
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("INCOME")) {
                incomeTransactionList.add(transaction);
            }
        }
        List<Transaction> transactions = transactionRepository.findAllByTransactionDate(day.getTransactionDate());
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch income theo năm
    @GetMapping("/user/{user_id}/income_transaction/{wallet_id}/year/{year}")
    public ResponseEntity<?> findIncomeTransactionsByYear(@PathVariable String user_id,
                                                          @PathVariable String wallet_id,
                                                          @PathVariable String year){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("INCOME")) {
                    incomeTransactions.add(transaction);
                }
            }
            // Parse the year string to an integer
            int yearValue = Integer.parseInt(year);

            // Find the first day of the year
            LocalDate firstDayOfYear = Year.of(yearValue).atDay(1);

            // Find the last day of the year
            LocalDate lastDayOfYear = Year.of(yearValue).atDay(firstDayOfYear.lengthOfYear());

            List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(firstDayOfYear, lastDayOfYear);
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("INCOME")) {
                incomeTransactionList.add(transaction);
            }
        }
        // Parse the year string to an integer
        int yearValue = Integer.parseInt(year);

        // Find the first day of the year
        LocalDate firstDayOfYear = Year.of(yearValue).atDay(1);

        // Find the last day of the year
        LocalDate lastDayOfYear = Year.of(yearValue).atDay(firstDayOfYear.lengthOfYear());

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(firstDayOfYear, lastDayOfYear);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch income theo tuần
    @PostMapping("/user/{user_id}/income_transaction/{wallet_id}/week")
    public ResponseEntity<?> findIncomeTransactionsByWeek(@PathVariable String user_id,
                                                          @PathVariable String wallet_id,
                                                          @RequestBody FindByWeek week){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("INCOME")) {
                    incomeTransactions.add(transaction);
                }
            }
            LocalDate startDate = week.getStartWeek();
            LocalDate endDate = week.getEndWeek();

            List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("INCOME")) {
                incomeTransactionList.add(transaction);
            }
        }
        LocalDate startDate = week.getStartWeek();
        LocalDate endDate = week.getEndWeek();

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch income theo khoảng thời gian
    @PostMapping("/user/{user_id}/income_transaction/{wallet_id}/time_range")
    public ResponseEntity<?> findIncomeTransactionsByRange(@PathVariable String user_id,
                                                           @PathVariable String wallet_id,
                                                           @RequestBody FindByWeek week){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("INCOME")) {
                    incomeTransactions.add(transaction);
                }
            }
            LocalDate startDate = week.getStartWeek();
            LocalDate endDate = week.getEndWeek();

            List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("INCOME")) {
                incomeTransactionList.add(transaction);
            }
        }
        LocalDate startDate = week.getStartWeek();
        LocalDate endDate = week.getEndWeek();

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch expense theo ngày
    @PostMapping("/user/{user_id}/expense_transaction/{wallet_id}/day")
    public ResponseEntity<?> findExpenseTransactionsByDay(@PathVariable String user_id,
                                                          @PathVariable String wallet_id,
                                                          @RequestBody FindByDay day){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("EXPENSE")) {
                    incomeTransactions.add(transaction);
                }
            }

            List<Transaction> transactions = transactionRepository.findAllByTransactionDate(day.getTransactionDate());
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("INCOME")) {
                incomeTransactionList.add(transaction);
            }
        }
        List<Transaction> transactions = transactionRepository.findAllByTransactionDate(day.getTransactionDate());
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch expense theo năm
    @GetMapping("/user/{user_id}/expense_transaction/{wallet_id}/year/{year}")
    public ResponseEntity<?> findExpenseTransactionsByYear(@PathVariable String user_id,
                                                           @PathVariable String wallet_id,
                                                           @PathVariable String year){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("EXPENSE")) {
                    incomeTransactions.add(transaction);
                }
            }
            // Parse the year string to an integer
            int yearValue = Integer.parseInt(year);

            // Find the first day of the year
            LocalDate firstDayOfYear = Year.of(yearValue).atDay(1);

            // Find the last day of the year
            LocalDate lastDayOfYear = Year.of(yearValue).atDay(firstDayOfYear.lengthOfYear());

            List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(firstDayOfYear, lastDayOfYear);
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("INCOME")) {
                incomeTransactionList.add(transaction);
            }
        }
        // Parse the year string to an integer
        int yearValue = Integer.parseInt(year);

        // Find the first day of the year
        LocalDate firstDayOfYear = Year.of(yearValue).atDay(1);

        // Find the last day of the year
        LocalDate lastDayOfYear = Year.of(yearValue).atDay(firstDayOfYear.lengthOfYear());

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(firstDayOfYear, lastDayOfYear);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch expense theo tuần
    @PostMapping("/user/{user_id}/expense_transaction/{wallet_id}/week")
    public ResponseEntity<?> findExpenseTransactionsByWeek(@PathVariable String user_id,
                                                           @PathVariable String wallet_id,
                                                           @RequestBody FindByWeek week){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("EXPENSE")) {
                    incomeTransactions.add(transaction);
                }
            }
            LocalDate startDate = week.getStartWeek();
            LocalDate endDate = week.getEndWeek();

            List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("INCOME")) {
                incomeTransactionList.add(transaction);
            }
        }
        LocalDate startDate = week.getStartWeek();
        LocalDate endDate = week.getEndWeek();

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch expense theo khoảng thời gian
    @PostMapping("/user/{user_id}/expense_transaction/{wallet_id}/time_range")
    public ResponseEntity<?> findExpenseTransactionsByRange(@PathVariable String user_id,
                                                            @PathVariable String wallet_id,
                                                            @RequestBody FindByWeek week){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();
            List<Transaction> incomeTransactions = new ArrayList<>();
            for (Transaction transaction: userTransaction) {
                String type = String.valueOf(transaction.getCategory().getType());
                if (type.equals("EXPENSE")) {
                    incomeTransactions.add(transaction);
                }
            }
            LocalDate startDate = week.getStartWeek();
            LocalDate endDate = week.getEndWeek();

            List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction) && incomeTransactions.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());
        List<Transaction> incomeTransactionList = new ArrayList<>();
        for (Transaction transaction:transactionList) {
            String type = String.valueOf(transaction.getCategory().getType());
            if (type.equals("INCOME")) {
                incomeTransactionList.add(transaction);
            }
        }
        LocalDate startDate = week.getStartWeek();
        LocalDate endDate = week.getEndWeek();

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction) && incomeTransactionList.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Lấy danh sách giao dịch theo khoảng thời gian
    @PostMapping("/user/{user_id}/transactions/{wallet_id}/time_range")
    public ResponseEntity<?> findTransactionsByRange(@PathVariable String user_id,
                                                     @PathVariable String wallet_id,
                                                     @RequestBody FindByWeek week){
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        // nếu wallet_id là all thì lấy tất cả giao dich
        if (wallet_id.equals("all")) {
            List<Transaction> userTransaction = userOptional.get().getTransactions();

            LocalDate startDate = week.getStartWeek();
            LocalDate endDate = week.getEndWeek();

            List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
            List<Transaction> result = new ArrayList<>();

            for (Transaction transaction : transactions) {
                if (userTransaction.contains(transaction)) {
                    result.add(transaction);
                }
            }
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        //tìm ví theo id
        Optional<Wallet> walletOptional = walletRepository.findById(Long.valueOf(wallet_id));
        if (walletOptional.isEmpty()) {
            return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
        }
        //tìm danh sach giao dịch theo ví
        List<Transaction> transactionList = transactionRepository.findByWallet(walletOptional.get());

        LocalDate startDate = week.getStartWeek();
        LocalDate endDate = week.getEndWeek();

        List<Transaction> transactions = transactionRepository.findAllByTransactionDateBetween(startDate, endDate);
        List<Transaction> userTransactions = userOptional.get().getTransactions();
        List<Transaction> result = new ArrayList<>();

        for (Transaction transaction : transactions) {
            if (userTransactions.contains(transaction)) {
                result.add(transaction);
            }
        }
        if (result.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
