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

    public RoomResponse create(RoomRequest request, String ownerId) {
        Room room = Room.builder()
                .guesthouseId(request.guesthouseId())
                .ownerId(ownerId)
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

    public RoomResponse getById(String id, String userId, String userRole) {
        Room room = getByIdEntity(id);
        if (!isAdmin(userRole) && userId != null && !userId.equals(room.getOwnerId())) {
            throw new ResourceNotFoundException("Room not found");
        }
        return toResponse(room);
    }

    public RoomResponse update(String id, RoomRequest request, String userId, String userRole) {
        Room room = getByIdEntity(id);
        if (!isAdmin(userRole) && !userId.equals(room.getOwnerId())) {
            throw new ResourceNotFoundException("Room not found");
        }
        room.setRoomNumber(request.roomNumber());
        room.setType(request.type());
        room.setPricePerNight(request.pricePerNight() != null ?
            java.math.BigDecimal.valueOf(request.pricePerNight()) : null);
        room.setCapacity(request.capacity());
        room.setAmenities(request.amenities());
        return toResponse(roomRepository.save(room));
    }

    public void delete(String id, String userId, String userRole) {
        Room room = getByIdEntity(id);
        if (!isAdmin(userRole) && !userId.equals(room.getOwnerId())) {
            throw new ResourceNotFoundException("Room not found");
        }
        room.setAvailable(false);
        roomRepository.save(room);
    }

    private boolean isAdmin(String userRole) {
        return "ADMIN".equals(userRole);
    }

    Room getByIdEntity(String id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }

    private RoomResponse toResponse(Room r) {
        return new RoomResponse(
                r.getId(), r.getGuesthouseId(), r.getOwnerId(), r.getRoomNumber(),
                r.getType(), r.getPricePerNight(), r.getCapacity(),
                r.getAmenities(), r.isAvailable(), r.getCreatedAt()
        );
    }
}
