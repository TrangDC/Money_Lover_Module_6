package com.example.money_lover_backend.repositories;

import com.example.money_lover_backend.models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget,Long> {

    @Query("SELECT b FROM Budget b WHERE b.wallet.id = :walletId " +
            "AND b.category.id = :categoryId " +
            "AND b.startDate >= :startDate " +
            "AND b.endDate <= :endDate")
    List<Budget> findBudgetsByWalletAndCategoryAndTimeRange(
            @Param("walletId") Long walletId,
            @Param("categoryId") Long categoryId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
