package com.platform.restaurant.dto;

import java.time.LocalDateTime;

public record RestaurantResponse(
    String id,
    String name,
    String description,
    String address,
    String phone,
    String imageUrl,
    boolean active,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}