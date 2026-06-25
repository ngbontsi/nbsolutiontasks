package com.platform.guesthouse.dto;


public record ReservationRequest (
     String roomId,
     String userId,
     String checkInDate,
    String checkOutDate,
    Integer numberOfGuests)
{
}
