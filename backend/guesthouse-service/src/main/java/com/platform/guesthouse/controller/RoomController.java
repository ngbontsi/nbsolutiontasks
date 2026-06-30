package com.platform.guesthouse.controller;

import com.platform.guesthouse.dto.RoomRequest;
import com.platform.guesthouse.dto.RoomResponse;
import com.platform.guesthouse.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<RoomResponse> create(
            @Valid @RequestBody RoomRequest request,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(roomService.create(request, userId));
    }

    @GetMapping("/guesthouse/{guesthouseId}")
    public ResponseEntity<List<RoomResponse>> getByGuesthouse(@PathVariable String guesthouseId) {
        return ResponseEntity.ok(roomService.getByGuesthouse(guesthouseId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getById(
            @PathVariable String id,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(roomService.getById(id, userId, userRole));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> update(
            @PathVariable String id,
            @Valid @RequestBody RoomRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(roomService.update(id, request, userId, userRole));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable String id,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        roomService.delete(id, userId, userRole);
        return ResponseEntity.noContent().build();
    }
}
