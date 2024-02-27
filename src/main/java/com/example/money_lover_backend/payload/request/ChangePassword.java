package com.example.money_lover_backend.payload.request;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePassword {
    private String oldPassword;
    private String newPassword;
    private String comfirmPassword;
}
