package com.platform.restaurant.service;

import com.platform.restaurant.dto.RestaurantRequest;
import com.platform.restaurant.dto.RestaurantResponse;
import com.platform.restaurant.exception.ResourceNotFoundException;
import com.platform.restaurant.model.Restaurant;
import com.platform.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantResponse create(RestaurantRequest request) {
        Restaurant restaurant = Restaurant.builder()
                .name(request.name())
                .description(request.description())
                .address(request.address())
                .phone(request.phone())
                .imageUrl(request.imageUrl())
                .build();
        return toResponse(restaurantRepository.save(restaurant));
    }

    public List<RestaurantResponse> getAll() {
        return restaurantRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<RestaurantResponse> getActive() {
        return restaurantRepository.findByActiveTrue().stream()
                .map(this::toResponse)
                .toList();
    }

    public RestaurantResponse getById(String id) {
        return toResponse(restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found")));
    }

    public RestaurantResponse update(String id, RestaurantRequest request) {
        Restaurant restaurant = getByIdEntity(id);
        restaurant.setName(request.name());
        restaurant.setDescription(request.description());
        restaurant.setAddress(request.address());
        restaurant.setPhone(request.phone());
        restaurant.setImageUrl(request.imageUrl());
        return toResponse(restaurantRepository.save(restaurant));
    }

    public void delete(String id) {
        Restaurant restaurant = getByIdEntity(id);
        restaurant.setActive(false);
        restaurantRepository.save(restaurant);
    }

    private Restaurant getByIdEntity(String id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
    }

    private RestaurantResponse toResponse(Restaurant r) {
        return new RestaurantResponse(
                r.getId(), r.getName(), r.getDescription(),
                r.getAddress(), r.getPhone(), r.getImageUrl(),
                r.isActive(), r.getCreatedAt(), r.getUpdatedAt()
        );
    }
}
