package com.example.money_lover_backend.controllers;

import com.example.money_lover_backend.models.Notification;
import com.example.money_lover_backend.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/notifications")
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class NotificationController {
    @Autowired
    private NotificationRepository notificationRepository;

    @PutMapping("/{id}/markAsRead")
    public ResponseEntity<?> markNotificationAsRead(@PathVariable Long id) {
        Notification notification = notificationRepository.findById(id).get();
        notification.setIsMarked(true);
        notificationRepository.save(notification);
        return ResponseEntity.ok("Notification marked as read successfully");
    }

}