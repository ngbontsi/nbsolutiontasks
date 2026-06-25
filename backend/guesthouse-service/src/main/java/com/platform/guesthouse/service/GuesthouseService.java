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

    public GuesthouseResponse create(GuesthouseRequest request) {
        Guesthouse guesthouse = Guesthouse.builder()
                .name(request.name())
                .description(request.description())
                .address(request.address())
                .phone(request.phone())
                .imageUrl(request.imageUrl())
                .amenities(request.amenities())
                .build();
        return toResponse(guesthouseRepository.save(guesthouse));
    }

    public List<GuesthouseResponse> getAll() {
        return guesthouseRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<GuesthouseResponse> getActive() {
        return guesthouseRepository.findByActiveTrue().stream()
                .map(this::toResponse)
                .toList();
    }

    public GuesthouseResponse getById(String id) {
        return toResponse(guesthouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guesthouse not found")));
    }

    public GuesthouseResponse update(String id, GuesthouseRequest request) {
        Guesthouse guesthouse = getByIdEntity(id);
        guesthouse.setName(request.name());
        guesthouse.setDescription(request.description());
        guesthouse.setAddress(request.address());
        guesthouse.setPhone(request.phone());
        guesthouse.setImageUrl(request.imageUrl());
        guesthouse.setAmenities(request.amenities());
        return toResponse(guesthouseRepository.save(guesthouse));
    }

    public void delete(String id) {
        Guesthouse guesthouse = getByIdEntity(id);
        guesthouse.setActive(false);
        guesthouseRepository.save(guesthouse);
    }

    private Guesthouse getByIdEntity(String id) {
        return guesthouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guesthouse not found"));
    }

    private GuesthouseResponse toResponse(Guesthouse g) {
        return new GuesthouseResponse(
                g.getId(), g.getName(), g.getDescription(),
                g.getAddress(), g.getPhone(), g.getImageUrl(),
                g.getAmenities(), g.isActive(), g.getCreatedAt(), g.getUpdatedAt()
        );
    }
}