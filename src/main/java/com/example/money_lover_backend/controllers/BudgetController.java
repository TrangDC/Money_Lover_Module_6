package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.models.*;
import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.payload.request.BudgetTimeRange;
import com.example.money_lover_backend.payload.request.CreateBudget;
import com.example.money_lover_backend.payload.request.EditBudget;
import com.example.money_lover_backend.repositories.BudgetRepository;
import com.example.money_lover_backend.repositories.NotificationRepository;
import com.example.money_lover_backend.repositories.TransactionRepository;
import com.example.money_lover_backend.services.impl.BudgetService;
import com.example.money_lover_backend.services.impl.CategoryService;
import com.example.money_lover_backend.services.impl.UserService;
import com.example.money_lover_backend.services.impl.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
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

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private NotificationRepository notificationRepository;

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

        if (isTimeRangeOverlapping(userOptional.get(), walletOptional.get(), categoryOptional.get(), createBudget.getStartDate(), createBudget.getEndDate())) {
            return ResponseEntity.badRequest().body("Unaccepted time range!");
        }
        budgetList.add(budget);
        userService.save(userOptional.get());
        budgetService.save(budget);
        return new ResponseEntity<String>("Create budget successfully", HttpStatus.OK);
    }

    private boolean isTimeRangeOverlapping(User user, Wallet wallet, Category category, LocalDate newStartDate, LocalDate newEndDate) {
        for (Budget oldBudget : user.getBudgets()) {
            if (oldBudget.getCategory().equals(category) && oldBudget.getWallet().equals(wallet)) {
                LocalDate oldStartDate = oldBudget.getStartDate();
                LocalDate oldEndDate = oldBudget.getEndDate();

                // Check if the new budget's time range overlaps with an existing budget's time range
                if (newStartDate.equals(oldStartDate) &&
                        newEndDate.equals(oldEndDate)) {
                    return true;
                }
            }
        }
        return false;
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


    //API kiểm tra budget dưới 20%
    @PostMapping("/user/{user_id}/check")
    public ResponseEntity<?> checkBudgetWithinTimeRange(@RequestBody BudgetTimeRange request,
                                                        @PathVariable String user_id) {
        //Lấy category và wallet
        Optional<Category> categoryOptional = categoryService.findById(request.getCategory_id());
        Optional<Wallet> walletOptional = walletService.getWalletById(request.getWallet_id());
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));

        if (categoryOptional.isEmpty() || walletOptional.isEmpty() || userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Category category = categoryOptional.get();
        Wallet wallet = walletOptional.get();
        LocalDate startDateToCheck = request.getStartDate();

        //Tìm những budget đúng theo category, wallet
        List<Budget> budgetsCheck = budgetRepository.findAllByWalletAndCategory(wallet, category);
        List<Budget> validBudgets = new ArrayList<>();
        for (Budget budget : budgetsCheck) {
            LocalDate budgetStartDate = budget.getStartDate();
            LocalDate budgetEndDate = budget.getEndDate();

            // Tìm những budget thỏa mãn thời gian giao dịch
            if (startDateToCheck.isEqual(budgetStartDate) || startDateToCheck.isEqual(budgetEndDate)
                    || (startDateToCheck.isAfter(budgetStartDate) && startDateToCheck.isBefore(budgetEndDate))) {
                validBudgets.add(budget);
            }
        }

        List<Notification> notifications = userOptional.get().getNotifications();

        //Với mỗi budget, tìm nhứng transaction có khoảng thời gian theo thời gian của budget
        for (Budget budget : validBudgets) {
            LocalDate budgetStartDate = budget.getStartDate();
            LocalDate budgetEndDate = budget.getEndDate();
            List<Transaction> transactions = transactionRepository.findAllByWalletAndCategoryAndTransactionDateBetween(wallet, category, budgetStartDate, budgetEndDate);

            //Tính tổng các giao dịch đó và so sánh với amount của budget
            Long amount = 0L;
            for (Transaction transaction : transactions) {
                amount += transaction.getAmount();
            }
            //Nếu nhỏ hơn 20%, tạo 1 thông báo tương ứng với budget đó và cho vào mảng
            double budgetPercentage = ((double) amount / budget.getAmount()) * 100;
            System.out.println(budgetPercentage);
            if ((100-budgetPercentage) < 20) {
                System.out.println(budgetPercentage);
                Notification notification = new Notification();
                notification.setMessage("Watch out. Only " + (budget.getAmount() - amount) + " left for " + budget.getName() + "!");
                notification.setCreatedAt(LocalDate.now());
                notification.setIsMarked(false);
                notification.setBudget(budget);
                notifications.add(notification);
                notificationRepository.save(notification);
            }
            userService.save(userOptional.get());
        }
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    //API sửa một budget
    @PutMapping("/user/{user_id}/edit/{budget_id}")
    public ResponseEntity<?> editBudget(@PathVariable String user_id,
                                        @PathVariable String budget_id,
                                        @RequestBody EditBudget request) {
        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate();
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        Optional<Category> categoryOptional = categoryService.findById(request.getCategory_id());
        Optional<Wallet> walletOptional = walletService.getWalletById(request.getWallet_id());
        Optional<Budget> budgetOptional = budgetRepository.findById(Long.valueOf(budget_id));
        if (userOptional.isEmpty() || categoryOptional.isEmpty() || walletOptional.isEmpty() || budgetOptional.isEmpty()) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
        Budget newBudget = new Budget();
        newBudget.setAmount(request.getAmount());
        newBudget.setWallet(walletOptional.get());
        newBudget.setCategory(categoryOptional.get());
        newBudget.setName(categoryOptional.get().getName());
        newBudget.setStartDate(request.getStartDate());
        newBudget.setEndDate(request.getEndDate());

        List<Budget> budgetList = userOptional.get().getBudgets();

        if (isTimeRangeOverlapping(userOptional.get(), walletOptional.get(), categoryOptional.get(), startDate, endDate)) {
            return ResponseEntity.badRequest().body("Unaccepted time range!");
        }
        newBudget.setId(budgetOptional.get().getId());
        budgetService.save(newBudget);
        return new ResponseEntity<Budget>(newBudget, HttpStatus.OK);
    }


    //API xóa một budget
    @DeleteMapping("/user/{user_id}/delete/{budget_id}")
    public ResponseEntity<?> deleteBudget(@PathVariable String user_id,
                                          @PathVariable String budget_id) {
        Optional<User> userOptional = userService.findById(Long.valueOf(user_id));
        Optional<Budget> budgetOptional = budgetRepository.findById(Long.valueOf(budget_id));

        if (userOptional.isEmpty() || budgetOptional.isEmpty()) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        Budget budget = budgetOptional.get();

        user.getBudgets().remove(budget);

        userService.save(user);

        budgetRepository.delete(budget);

        return new ResponseEntity<String>("Budget deleted successfully", HttpStatus.OK);
    }

}
