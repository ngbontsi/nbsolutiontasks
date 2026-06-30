package com.platform.guesthouse.controller;

import com.platform.guesthouse.dto.ReservationRequest;
import com.platform.guesthouse.dto.ReservationResponse;
import com.platform.guesthouse.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationResponse> create(
            @Valid @RequestBody ReservationRequest request,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(reservationService.create(request, userId));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ReservationResponse>> getMyReservations(
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(reservationService.getByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponse> getById(
            @PathVariable String id,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(reservationService.getById(id, userId, userRole));
    }
}
