package com.example.money_lover_backend.controllers;

import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

import com.example.money_lover_backend.models.TokenExpire;
import com.example.money_lover_backend.models.Wallet;
import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.models.category.DefaultCategory;
import com.example.money_lover_backend.repositories.TokenExpireRepository;
import com.example.money_lover_backend.services.ICategoryService;
import com.example.money_lover_backend.services.IDefaultCategoryService;
import com.example.money_lover_backend.services.impl.EmailService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    EmailService emailService;

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

    @Autowired
    ICategoryService categoryService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + loginRequest.getEmail());
        }
        if (userOptional.isPresent() && userOptional.get().isActive()) {
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
        return new ResponseEntity<>("No user were found", HttpStatus.NOT_FOUND);
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

        List<Wallet> wallets = new ArrayList<>();
        Wallet default_wallet = new Wallet();
        default_wallet.setName("Default Wallet");
        default_wallet.setBalance(0L);
        List<Category> active_categories = new ArrayList<>();
        default_wallet.setActiveCategories(active_categories);
        wallets.add(default_wallet);
        Iterable<Category> categories = categoryService.createDefaultCategories();
        User user = new User(
                username,
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getPassword(),
                (List<Category>) categories,
                wallets
        );
        user.setWallets(wallets);

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

        if (tokenExpireOptional.isEmpty()) {
            TokenExpire newTokenExpire = new TokenExpire();
            newTokenExpire.setToken(tokenExpire.getToken());
            tokenExpireRepository.save(tokenExpire);
        }

        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Token expired saved successfully");
    }

    @GetMapping("/forgot_password/{email}")
    public ResponseEntity<?> processForgotPassword(@PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email not found!"));
        }
        User user = userOptional.get();
        String emailContent = "Your current password:  " +
                user.getDecode_password();
        emailService.sendEmail(email, "Get forgotten password", emailContent);
        return new ResponseEntity<>("Email has been sent", HttpStatus.OK);

    }

    @GetMapping("/active_account/{email}")
    public ResponseEntity<?> processActiveAccount(@PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email not found!"));
        }
        User user = userOptional.get();

        SecureRandom secureRandom = new SecureRandom();

        int tokenLength = 32;

        char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();

        StringBuilder tokenBuilder = new StringBuilder(tokenLength);

        for (int i = 0; i < tokenLength; i++) {
            char randomChar = chars[secureRandom.nextInt(chars.length)];
            tokenBuilder.append(randomChar);
        }

        String token = tokenBuilder.toString();

        user.setActiveToken(token);
        userRepository.save(user);
        String emailContent = "Your active code:  " +
                user.getActiveToken() + ". ";
        emailService.sendEmail(email, "Get auth code", emailContent);
        return new ResponseEntity<>("Email has been sent", HttpStatus.OK);

    }



}
