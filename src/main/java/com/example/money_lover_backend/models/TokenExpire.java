package com.example.money_lover_backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TokenExpire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // getters and setters
}
