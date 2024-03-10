package com.example.money_lover_backend.models;

import com.example.money_lover_backend.models.category.Category;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "wallets")
@Data
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long balance;

    private boolean isActive;

}
