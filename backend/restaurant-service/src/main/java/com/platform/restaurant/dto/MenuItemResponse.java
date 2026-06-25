package com.platform.restaurant.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record MenuItemResponse(
                                String id,
 String restaurantId,
 String name,
 String description,
 BigDecimal price,
 String category,
 String imageUrl,
 boolean available,
 LocalDateTime createdAt
) {}
