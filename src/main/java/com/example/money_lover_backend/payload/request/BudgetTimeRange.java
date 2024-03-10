package com.example.money_lover_backend.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetTimeRange {
    private Long wallet_id;
    private Long category_id;
    private LocalDate startDate;
    private LocalDate endDate;
}
