package com.example.money_lover_backend.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
@Data
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String username;

    @Getter
    private String image;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @NotBlank
    @Size(max = 120)
    private String decode_password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wallet> wallets = new ArrayList<>();

    @Column(name = "active_token")
    @Getter
    @Setter
    private String activeToken;


    private boolean isActive;

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public User() {

    }
    public User(String username, String email, String password, String decode_password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.decode_password = decode_password;
        this.isActive = false;
    }


    public User(String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(String name, String username, String email, String password, String avatar) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.image = avatar;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User(Long id, String name, String username, String email, String password, List<Wallet> wallets) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.wallets = wallets;
    }
}
