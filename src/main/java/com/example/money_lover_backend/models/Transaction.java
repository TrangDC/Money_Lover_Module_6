package com.example.money_lover_backend.models;

import com.example.money_lover_backend.models.category.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private BigDecimal amount;
    private String note;
    private Timestamp transactionDate;

    private String lender;
    private String borrower;

}

