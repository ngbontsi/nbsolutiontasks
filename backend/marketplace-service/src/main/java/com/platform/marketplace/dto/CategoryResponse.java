package com.platform.marketplace.dto;

import java.time.LocalDateTime;

public record CategoryResponse(
    String id,
    String name,
    String description,
    String imageUrl,
    boolean active,
    LocalDateTime createdAt
) {}