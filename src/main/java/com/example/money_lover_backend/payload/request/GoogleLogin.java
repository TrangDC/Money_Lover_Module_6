package com.example.money_lover_backend.payload.request;

import lombok.*;

@Data
@Getter
@NoArgsConstructor
@Setter
@AllArgsConstructor
public class GoogleLogin {

    private String emails;
}
