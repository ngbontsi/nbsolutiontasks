package com.platform.guesthouse.controller;

import com.platform.guesthouse.dto.GuesthouseRequest;
import com.platform.guesthouse.dto.GuesthouseResponse;
import com.platform.guesthouse.service.GuesthouseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guesthouses")
@RequiredArgsConstructor
public class GuesthouseController {

    private final GuesthouseService guesthouseService;

    @PostMapping
    public ResponseEntity<GuesthouseResponse> create(
            @Valid @RequestBody GuesthouseRequest request,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(guesthouseService.create(request, userId));
    }

    @GetMapping
    public ResponseEntity<List<GuesthouseResponse>> getAll(
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(guesthouseService.getAll(userId, userRole));
    }

    @GetMapping("/active")
    public ResponseEntity<List<GuesthouseResponse>> getActive(
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(guesthouseService.getActive(userId, userRole));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuesthouseResponse> getById(
            @PathVariable String id,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(guesthouseService.getById(id, userId, userRole));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GuesthouseResponse> update(
            @PathVariable String id,
            @Valid @RequestBody GuesthouseRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(guesthouseService.update(id, request, userId, userRole));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable String id,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        guesthouseService.delete(id, userId, userRole);
        return ResponseEntity.noContent().build();
    }
}
