package com.example.money_lover_backend.services.impl;

import com.example.money_lover_backend.models.User;
import com.example.money_lover_backend.repositories.UserRepository;
import com.example.money_lover_backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void remove(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByActiveToken(String activeToken) {
        return userRepository.findByActiveToken(activeToken);
    }

    public void updateActiveToken(String token, String email) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional != null) {
            User user = userOptional.get();
            user.setActiveToken(token);
            userRepository.save(user);
        } else {
            throw new Exception("Could not find any user with the email " + email);
        }
    }


}
