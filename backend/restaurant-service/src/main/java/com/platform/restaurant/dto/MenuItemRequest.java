package com.platform.restaurant.dto;

public record MenuItemRequest(
    String restaurantId,
    String name,
    String description,
    Double price,
    String category,
    String imageUrl
) {}
