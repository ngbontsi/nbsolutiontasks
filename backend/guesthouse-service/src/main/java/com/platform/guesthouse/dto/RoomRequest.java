package com.platform.guesthouse.dto;


public record RoomRequest (
    String guesthouseId,
     String roomNumber,
     String type,
     Double pricePerNight,
     Integer capacity,
     String amenities
){}
