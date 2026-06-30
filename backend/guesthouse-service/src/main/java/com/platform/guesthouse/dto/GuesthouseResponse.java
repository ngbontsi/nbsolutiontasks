package com.platform.guesthouse.dto;

import java.time.LocalDateTime;

public record GuesthouseResponse(
    String id,
    String ownerId,
    String name,
    String description,
    String address,
    String phone,
    String imageUrl,
    String amenities,
    boolean active,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}