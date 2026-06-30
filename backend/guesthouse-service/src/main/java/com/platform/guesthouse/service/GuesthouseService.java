package com.platform.guesthouse.service;

import com.platform.guesthouse.dto.GuesthouseRequest;
import com.platform.guesthouse.dto.GuesthouseResponse;
import com.platform.guesthouse.exception.ResourceNotFoundException;
import com.platform.guesthouse.model.Guesthouse;
import com.platform.guesthouse.repository.GuesthouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GuesthouseService {

    private final GuesthouseRepository guesthouseRepository;

    public GuesthouseResponse create(GuesthouseRequest request, String ownerId) {
        Guesthouse guesthouse = Guesthouse.builder()
                .ownerId(ownerId)
                .name(request.name())
                .description(request.description())
                .address(request.address())
                .phone(request.phone())
                .imageUrl(request.imageUrl())
                .amenities(request.amenities())
                .build();
        return toResponse(guesthouseRepository.save(guesthouse));
    }

    public List<GuesthouseResponse> getAll(String userId, String userRole) {
        if (isAdmin(userRole)) {
            return guesthouseRepository.findAll().stream()
                    .map(this::toResponse)
                    .toList();
        }
        List<Guesthouse> guesthouses = (userId != null)
                ? guesthouseRepository.findByOwnerId(userId)
                : guesthouseRepository.findAll();
        return guesthouses.stream()
                .map(this::toResponse)
                .toList();
    }

    public List<GuesthouseResponse> getActive(String userId, String userRole) {
        if (isAdmin(userRole)) {
            return guesthouseRepository.findByActiveTrue().stream()
                    .map(this::toResponse)
                    .toList();
        }
        List<Guesthouse> guesthouses = (userId != null)
                ? guesthouseRepository.findByOwnerIdAndActiveTrue(userId)
                : guesthouseRepository.findByActiveTrue();
        return guesthouses.stream()
                .map(this::toResponse)
                .toList();
    }

    public GuesthouseResponse getById(String id, String userId, String userRole) {
        Guesthouse guesthouse = getByIdEntity(id);
        if (!isAdmin(userRole) && userId != null && !userId.equals(guesthouse.getOwnerId())) {
            throw new ResourceNotFoundException("Guesthouse not found");
        }
        return toResponse(guesthouse);
    }

    public GuesthouseResponse update(String id, GuesthouseRequest request, String userId, String userRole) {
        Guesthouse guesthouse = getByIdEntity(id);
        if (!isAdmin(userRole) && !userId.equals(guesthouse.getOwnerId())) {
            throw new ResourceNotFoundException("Guesthouse not found");
        }
        guesthouse.setName(request.name());
        guesthouse.setDescription(request.description());
        guesthouse.setAddress(request.address());
        guesthouse.setPhone(request.phone());
        guesthouse.setImageUrl(request.imageUrl());
        guesthouse.setAmenities(request.amenities());
        return toResponse(guesthouseRepository.save(guesthouse));
    }

    public void delete(String id, String userId, String userRole) {
        Guesthouse guesthouse = getByIdEntity(id);
        if (!isAdmin(userRole) && !userId.equals(guesthouse.getOwnerId())) {
            throw new ResourceNotFoundException("Guesthouse not found");
        }
        guesthouse.setActive(false);
        guesthouseRepository.save(guesthouse);
    }

    private boolean isAdmin(String userRole) {
        return "ADMIN".equals(userRole);
    }

    private Guesthouse getByIdEntity(String id) {
        return guesthouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guesthouse not found"));
    }

    private GuesthouseResponse toResponse(Guesthouse g) {
        return new GuesthouseResponse(
                g.getId(), g.getOwnerId(), g.getName(), g.getDescription(),
                g.getAddress(), g.getPhone(), g.getImageUrl(),
                g.getAmenities(), g.isActive(), g.getCreatedAt(), g.getUpdatedAt()
        );
    }
}
