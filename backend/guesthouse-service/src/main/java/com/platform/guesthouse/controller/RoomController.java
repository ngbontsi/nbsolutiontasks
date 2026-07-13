package com.platform.guesthouse.controller;

import com.platform.guesthouse.dto.RoomRequest;
import com.platform.guesthouse.dto.RoomResponse;
import com.platform.guesthouse.service.RoomService;
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
@RequestMapping("/rooms")
@RequiredArgsConstructor
@Tag(name = "Rooms", description = "Room management endpoints")
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    @Operation(summary = "Create a room", description = "Creates a new room for a guesthouse")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Room created successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = RoomResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input",
                    content = @Content)
    })
    public ResponseEntity<RoomResponse> create(
            @Valid @RequestBody RoomRequest request,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(roomService.create(request, userId));
    }

    @GetMapping("/guesthouse/{guesthouseId}")
    @Operation(summary = "Get rooms by guesthouse", description = "Retrieves all rooms for a specific guesthouse")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved rooms",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = RoomResponse.class)))
    })
    public ResponseEntity<List<RoomResponse>> getByGuesthouse(@PathVariable String guesthouseId) {
        return ResponseEntity.ok(roomService.getByGuesthouse(guesthouseId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get room by ID", description = "Retrieves a single room by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Room found",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = RoomResponse.class))),
            @ApiResponse(responseCode = "404", description = "Room not found",
                    content = @Content)
    })
    public ResponseEntity<RoomResponse> getById(
            @PathVariable String id,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(roomService.getById(id, userId, userRole));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a room", description = "Updates an existing room by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Room updated successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = RoomResponse.class))),
            @ApiResponse(responseCode = "404", description = "Room not found",
                    content = @Content)
    })
    public ResponseEntity<RoomResponse> update(
            @PathVariable String id,
            @Valid @RequestBody RoomRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(roomService.update(id, request, userId, userRole));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a room", description = "Deletes a room by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Room deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Room not found")
    })
    public ResponseEntity<Void> delete(
            @PathVariable String id,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        roomService.delete(id, userId, userRole);
        return ResponseEntity.noContent().build();
    }
}
