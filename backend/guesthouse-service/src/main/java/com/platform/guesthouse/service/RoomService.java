package com.platform.guesthouse.service;

import com.platform.guesthouse.dto.RoomRequest;
import com.platform.guesthouse.dto.RoomResponse;
import com.platform.guesthouse.exception.ResourceNotFoundException;
import com.platform.guesthouse.model.Room;
import com.platform.guesthouse.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomResponse create(RoomRequest request) {
        Room room = Room.builder()
                .guesthouseId(request.guesthouseId())
                .roomNumber(request.roomNumber())
                .type(request.type())
                .pricePerNight(request.pricePerNight() != null ?
                    java.math.BigDecimal.valueOf(request.pricePerNight()) : null)
                .capacity(request.capacity())
                .amenities(request.amenities())
                .build();
        return toResponse(roomRepository.save(room));
    }

    public List<RoomResponse> getByGuesthouse(String guesthouseId) {
        return roomRepository.findByGuesthouseId(guesthouseId).stream()
                .map(this::toResponse)
                .toList();
    }

    public RoomResponse getById(String id) {
        return toResponse(roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found")));
    }

    public RoomResponse update(String id, RoomRequest request) {
        Room room = getByIdEntity(id);
        room.setRoomNumber(request.roomNumber());
        room.setType(request.type());
        room.setPricePerNight(request.pricePerNight() != null ?
            java.math.BigDecimal.valueOf(request.pricePerNight()) : null);
        room.setCapacity(request.capacity());
        room.setAmenities(request.amenities());
        return toResponse(roomRepository.save(room));
    }

    public void delete(String id) {
        Room room = getByIdEntity(id);
        room.setAvailable(false);
        roomRepository.save(room);
    }

    Room getByIdEntity(String id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }

    private RoomResponse toResponse(Room r) {
        return new RoomResponse(
                r.getId(), r.getGuesthouseId(), r.getRoomNumber(),
                r.getType(), r.getPricePerNight(), r.getCapacity(),
                r.getAmenities(), r.isAvailable(), r.getCreatedAt()
        );
    }
}