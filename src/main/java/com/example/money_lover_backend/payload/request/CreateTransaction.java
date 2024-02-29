package com.example.money_lover_backend.payload.request;

import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Getter
@NoArgsConstructor
@Setter
@AllArgsConstructor
public class CreateTransaction {
    private Long amount;

    private String note;

    private Timestamp transactionDate;

    private Timestamp endDate;

    private String lender;

    private String borrower;

    private Long wallet_id;

    private Long category_id;

}
