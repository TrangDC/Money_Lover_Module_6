package com.example.money_lover_backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    JavaMailSender javaMailSender;

    public void sendEmail(String toEmail, String subject, String content) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("trangdinhcongtmqt@gmail.com");
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(content);
        javaMailSender.send(mailMessage);
    }
    public void sendEmailLockUser(String toEmail) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("trangdinhcongtmqt@gmail.com");
        mailMessage.setTo(toEmail);
        mailMessage.setSubject("Thông báo khóa tài khoản");
        mailMessage.setText("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên để mở khóa tài khoản");
        javaMailSender.send(mailMessage);
    }
    public void sendEmailApproved(String toEmail) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("trangdinhcongtmqt@gmail.com");
        mailMessage.setTo(toEmail);
        mailMessage.setSubject("Thông báo xác nhận làm giáo viên");
        mailMessage.setText("Tài khoản của bạn đã được duyệt làm giáo viên. Chúc mừng bạn!");
        javaMailSender.send(mailMessage);
    }
}
