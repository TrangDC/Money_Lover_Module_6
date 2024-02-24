package com.example.money_lover_backend.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.money_lover_backend.models.TokenExpire;
import com.example.money_lover_backend.repositories.TokenExpireRepository;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.money_lover_backend.enums.ERole;
import com.example.money_lover_backend.models.Role;
import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.payload.request.LoginRequest;
import com.example.money_lover_backend.payload.request.SignupRequest;
import com.example.money_lover_backend.payload.response.JwtResponse;
import com.example.money_lover_backend.payload.response.MessageResponse;
import com.example.money_lover_backend.repositories.RoleRepository;
import com.example.money_lover_backend.repositories.UserRepository;
import com.example.money_lover_backend.security.jwt.JwtUtils;
import com.example.money_lover_backend.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    TokenExpireRepository tokenExpireRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + loginRequest.getEmail());
        }
        User user = userOptional.get();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getImage(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }


        String email = signUpRequest.getEmail();
        String[] emailParts = email.split("@");
        String username = emailParts[0].replace(".", "") + "_" + emailParts[1];


        int count = 1;
        String baseUsername = username;
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + count;
            count++;
        }


        User user = new User(
                username,
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logOut(@RequestBody TokenExpire tokenExpire) {
        Optional<TokenExpire> tokenExpireOptional = tokenExpireRepository.findByToken(tokenExpire.getToken());

        if (tokenExpireOptional.isPresent()) {
            tokenExpireOptional.get().setUser(tokenExpire.getUser());
        } else {
            TokenExpire newTokenExpire = new TokenExpire();
            newTokenExpire.setToken(tokenExpire.getToken());
            newTokenExpire.setUser(tokenExpire.getUser());
            tokenExpireRepository.save(tokenExpire);
        }
        return ResponseEntity.ok("Token expired saved successfully");
    }
}
