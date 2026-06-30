package com.platform.guesthouse.dto;


public record ReservationRequest (
     String roomId,
     String checkInDate,
    String checkOutDate,
    Integer numberOfGuests)
{
}
