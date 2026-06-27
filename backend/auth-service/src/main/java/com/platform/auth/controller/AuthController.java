package com.platform.auth.controller;

import com.platform.auth.dto.AuthResponse;
import com.platform.auth.dto.LoginRequest;
import com.platform.auth.dto.RegisterRequest;
import com.platform.auth.dto.UserResponse;
import com.platform.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/users")
    public ResponseEntity<java.util.List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<UserResponse> updateUserRole(
            @PathVariable String id,
            @RequestBody Map<String, String> body,
            @RequestHeader("X-User-Role") String callerRole,
            @RequestHeader("X-User-Id") String callerId,
            @RequestHeader("X-User-Email") String callerEmail) {
        if (!"ADMIN".equals(callerRole)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(authService.updateUserRole(id, body.get("role"), callerId, callerEmail));
    }

    @PutMapping("/users/{id}/enabled")
    public ResponseEntity<UserResponse> toggleUserEnabled(
            @PathVariable String id,
            @RequestBody Map<String, Boolean> body,
            @RequestHeader("X-User-Role") String callerRole,
            @RequestHeader("X-User-Id") String callerId,
            @RequestHeader("X-User-Email") String callerEmail) {
        if (!"ADMIN".equals(callerRole)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(authService.toggleUserEnabled(id, body.get("enabled"), callerId, callerEmail));
    }
}
