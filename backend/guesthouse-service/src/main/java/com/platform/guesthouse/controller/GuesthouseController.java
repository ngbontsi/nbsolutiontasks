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
    public ResponseEntity<GuesthouseResponse> create(@Valid @RequestBody GuesthouseRequest request) {
        return ResponseEntity.ok(guesthouseService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<GuesthouseResponse>> getAll() {
        return ResponseEntity.ok(guesthouseService.getAll());
    }

    @GetMapping("/active")
    public ResponseEntity<List<GuesthouseResponse>> getActive() {
        return ResponseEntity.ok(guesthouseService.getActive());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuesthouseResponse> getById(@PathVariable String id) {
        return ResponseEntity.ok(guesthouseService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GuesthouseResponse> update(@PathVariable String id, @Valid @RequestBody GuesthouseRequest request) {
        return ResponseEntity.ok(guesthouseService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        guesthouseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}