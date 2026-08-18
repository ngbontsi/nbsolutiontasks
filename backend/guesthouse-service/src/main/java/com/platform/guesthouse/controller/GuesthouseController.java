package com.platform.guesthouse.controller;

import com.platform.guesthouse.dto.GuesthouseRequest;
import com.platform.guesthouse.dto.GuesthouseResponse;
import com.platform.guesthouse.service.GuesthouseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guesthouses")
@RequiredArgsConstructor
@Tag(name = "Guesthouses", description = "Guesthouse management endpoints")
public class GuesthouseController {

    private final GuesthouseService guesthouseService;

    @PostMapping
    @Operation(summary = "Create a guesthouse", description = "Creates a new guesthouse with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Guesthouse created successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GuesthouseResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input",
                    content = @Content)
    })
    public ResponseEntity<GuesthouseResponse> create(
            @Valid @RequestBody GuesthouseRequest request,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(guesthouseService.create(request, userId));
    }

    @GetMapping
    @Operation(summary = "Get all guesthouses", description = "Retrieves all guesthouses. Admins see all; owners see only their own.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved guesthouses",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GuesthouseResponse.class)))
    })
    public ResponseEntity<List<GuesthouseResponse>> getAll(
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(guesthouseService.getAll(userId, userRole));
    }

    @GetMapping("/active")
    @Operation(summary = "Get active guesthouses", description = "Retrieves all active guesthouses")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved active guesthouses",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GuesthouseResponse.class)))
    })
    public ResponseEntity<List<GuesthouseResponse>> getActive(
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(guesthouseService.getActive(userId, userRole));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get guesthouse by ID", description = "Retrieves a single guesthouse by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Guesthouse found",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GuesthouseResponse.class))),
            @ApiResponse(responseCode = "404", description = "Guesthouse not found",
                    content = @Content)
    })
    public ResponseEntity<GuesthouseResponse> getById(
            @PathVariable String id,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(guesthouseService.getById(id, userId, userRole));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a guesthouse", description = "Updates an existing guesthouse by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Guesthouse updated successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GuesthouseResponse.class))),
            @ApiResponse(responseCode = "404", description = "Guesthouse not found",
                    content = @Content)
    })
    public ResponseEntity<GuesthouseResponse> update(
            @PathVariable String id,
            @Valid @RequestBody GuesthouseRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(guesthouseService.update(id, request, userId, userRole));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a guesthouse", description = "Deletes a guesthouse by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Guesthouse deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Guesthouse not found")
    })
    public ResponseEntity<Void> delete(
            @PathVariable String id,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        guesthouseService.delete(id, userId, userRole);
        return ResponseEntity.noContent().build();
    }
}
