package com.platform.restaurant.dto;

public record RestaurantRequest(
    String name,
    String description,
    String address,
    String phone,
    String imageUrl
) {}
