package com.example.money_lover_backend.models;

public class Wallet {
    private int wallet_id;
    private int user_id;
    private String wallet_name;
    private double balance;

    public Wallet(int wallet_id, int user_id, String wallet_name, double balance) {
        this.wallet_id = wallet_id;
        this.user_id = user_id;
        this.wallet_name = wallet_name;
        this.balance = balance;
    }

    public int getWallet_id() {
        return wallet_id;
    }

    public void setWallet_id(int wallet_id) {
        this.wallet_id = wallet_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getWallet_name() {
        return wallet_name;
    }

    public void setWallet_name(String wallet_name) {
        this.wallet_name = wallet_name;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Wallet ID: " + wallet_id +
                ", User ID: " + user_id +
                ", Wallet Name: " + wallet_name +
                ", Balance: $" + balance;
    }
}
