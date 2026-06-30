package com.platform.marketplace.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductResponse(
    String id,
    String ownerId,
    String name,
    String description,
    BigDecimal price,
    Integer stockQuantity,
    String categoryId,
    String imageUrl,
    String brand,
    Double rating,
    Integer reviewCount,
    boolean active,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}