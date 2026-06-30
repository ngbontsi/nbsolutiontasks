package com.platform.guesthouse.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record RoomResponse(
    String id,
    String guesthouseId,
    String ownerId,
    String roomNumber,
    String type,
    BigDecimal pricePerNight,
    int capacity,
    String amenities,
    boolean available,
    LocalDateTime createdAt
) {}