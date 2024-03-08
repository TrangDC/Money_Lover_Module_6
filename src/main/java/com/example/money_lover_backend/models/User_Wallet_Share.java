package com.example.money_lover_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User_Wallet_Share {

    private String user_id;
    private String wallet_id;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
