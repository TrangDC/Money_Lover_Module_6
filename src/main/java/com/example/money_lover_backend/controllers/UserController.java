package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.dto.UserImage;
import com.example.money_lover_backend.enums.ERole;
import com.example.money_lover_backend.models.Role;
import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.models.category.Category;
import com.example.money_lover_backend.payload.request.ChangePassword;
import com.example.money_lover_backend.payload.request.EditUser;
import com.example.money_lover_backend.payload.response.MessageResponse;
import com.example.money_lover_backend.repositories.RoleRepository;
import com.example.money_lover_backend.repositories.UserRepository;
import com.example.money_lover_backend.repositories.WalletRepository;
import com.example.money_lover_backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private IUserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletRepository walletRepository;

    @GetMapping
    public ResponseEntity<Iterable<User>> findAll() {
        List<User> users = (List<User>) userService.findAll();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
    }

    // Endpoint to find user information based on wallet ID
    @GetMapping("/wallet/{walletId}")
    public ResponseEntity<User> getUserByWalletId(@PathVariable Long walletId) {
        Optional<User> user = userRepository.findByWalletsId(walletId);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody EditUser editUser) {
        Optional<User> userOptional = userService.findById(id);
        if (!userOptional.isPresent()) {
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String email = editUser.getEmail();

        String userEmail = userOptional.get().getEmail();
        if(userRepository.existsByEmail(email) && !userEmail.equals(email)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        User user = userOptional.get();
        user.setEmail(editUser.getEmail());
        user.setName(editUser.getName());
        user.setUsername(editUser.getUsername());
        return new ResponseEntity<>(userService.save(user), HttpStatus.OK);
    }

    @PutMapping("/{id}/uploadImage")
    public ResponseEntity<User> uploadImage(@PathVariable Long id, @RequestBody UserImage userImage) {
        Optional<User> userOptional = userService.findById(id);
        if (!userOptional.isPresent()) {
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        System.out.println(userImage.getImage());
        userOptional.get().setImage(userImage.getImage());

        return new ResponseEntity<>(userService.save(userOptional.get()), HttpStatus.OK);
    }
    @GetMapping("/process_active/{token}")
    public ResponseEntity<?> findByToken(@PathVariable String token) {
        Optional<User> userOptional = userRepository.findByActiveToken(token);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setActive(true);
            userService.save(user);
            return new ResponseEntity<>("Active successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("No user were found", HttpStatus.NOT_FOUND);
    }
    @PutMapping("/{id}/change_password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassword changePassword, @PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (!userOptional.isPresent()) {
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String oldPassword = changePassword.getOldPassword();
        String newPassword = changePassword.getNewPassword();
        String confirmPassword = changePassword.getConfirmPassword();
        String userPassword = userOptional.get().getDecode_password();
        if (userPassword.equals(oldPassword) && newPassword.equals(confirmPassword) && !userPassword.equals(newPassword)) {
            userOptional.get().setDecode_password(newPassword);
            userOptional.get().setPassword(encoder.encode(newPassword));
            userRepository.save(userOptional.get());
            return new ResponseEntity<>("changePassword success !", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
