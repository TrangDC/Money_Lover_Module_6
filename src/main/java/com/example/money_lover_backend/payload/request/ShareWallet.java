package com.example.money_lover_backend.payload.request;

import com.example.money_lover_backend.enums.ERole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShareWallet {
    private Long wallet_id;
    private String email;
    private ERole role;

}
