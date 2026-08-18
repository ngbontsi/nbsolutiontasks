package com.platform.guesthouse.dto;

import com.platform.guesthouse.model.ReservationStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReservationResponse(
    String id,
    String roomId,
    String userId,
    LocalDate checkInDate,
    LocalDate checkOutDate,
    int numberOfGuests,
    ReservationStatus status,
    double totalPrice,
    LocalDateTime createdAt
) {}