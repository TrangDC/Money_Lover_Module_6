package com.example.money_lover_backend.payload.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FindByWeek {
    private LocalDate startWeek;
    private LocalDate endWeek;
}