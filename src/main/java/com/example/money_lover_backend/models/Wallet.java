package com.example.money_lover_backend.models;

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

    @OneToMany(mappedBy = "wallet")
    private List<Transaction> transactions;

    @ManyToMany
    @JoinTable(
            name = "Wallet_Category",
            joinColumns = @JoinColumn(name = "wallet_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> activeCategories;

}
