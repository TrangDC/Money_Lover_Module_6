package com.example.money_lover_backend.dto;

public class UserImage {

    private String userId;
    private String image;

    public UserImage(String userId, String image) {
        this.image = image;
        this.userId = userId;
    }

    public UserImage() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
