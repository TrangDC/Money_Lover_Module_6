package com.example.money_lover_backend.payload.request;

import lombok.Data;

import java.time.LocalDate;
@Data
public class EditBudget {
    private Long wallet_id;
    private Long amount;
    private Long category_id;
    private LocalDate startDate;
    private LocalDate endDate;
}
