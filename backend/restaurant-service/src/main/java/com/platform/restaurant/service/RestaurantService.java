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

    public RestaurantResponse create(RestaurantRequest request, String ownerId) {
        Restaurant restaurant = Restaurant.builder()
                .ownerId(ownerId)
                .name(request.name())
                .description(request.description())
                .address(request.address())
                .phone(request.phone())
                .imageUrl(request.imageUrl())
                .build();
        return toResponse(restaurantRepository.save(restaurant));
    }

    public List<RestaurantResponse> getAll(String userId, String userRole) {
        if (isAdmin(userRole)) {
            return restaurantRepository.findAll().stream()
                    .map(this::toResponse)
                    .toList();
        }
        List<Restaurant> restaurants = (userId != null)
                ? restaurantRepository.findByOwnerId(userId)
                : restaurantRepository.findAll();
        return restaurants.stream()
                .map(this::toResponse)
                .toList();
    }

    public List<RestaurantResponse> getActive(String userId, String userRole) {
        if (isAdmin(userRole)) {
            return restaurantRepository.findByActiveTrue().stream()
                    .map(this::toResponse)
                    .toList();
        }
        List<Restaurant> restaurants = (userId != null)
                ? restaurantRepository.findByOwnerIdAndActiveTrue(userId)
                : restaurantRepository.findByActiveTrue();
        return restaurants.stream()
                .map(this::toResponse)
                .toList();
    }

    public RestaurantResponse getById(String id, String userId, String userRole) {
        Restaurant restaurant = getByIdEntity(id);
        if (!isAdmin(userRole) && userId != null && !userId.equals(restaurant.getOwnerId())) {
            throw new ResourceNotFoundException("Restaurant not found");
        }
        return toResponse(restaurant);
    }

    public RestaurantResponse update(String id, RestaurantRequest request, String userId, String userRole) {
        Restaurant restaurant = getByIdEntity(id);
        if (!isAdmin(userRole) && !userId.equals(restaurant.getOwnerId())) {
            throw new ResourceNotFoundException("Restaurant not found");
        }
        restaurant.setName(request.name());
        restaurant.setDescription(request.description());
        restaurant.setAddress(request.address());
        restaurant.setPhone(request.phone());
        restaurant.setImageUrl(request.imageUrl());
        return toResponse(restaurantRepository.save(restaurant));
    }

    public void delete(String id, String userId, String userRole) {
        Restaurant restaurant = getByIdEntity(id);
        if (!isAdmin(userRole) && !userId.equals(restaurant.getOwnerId())) {
            throw new ResourceNotFoundException("Restaurant not found");
        }
        restaurant.setActive(false);
        restaurantRepository.save(restaurant);
    }

    private boolean isAdmin(String userRole) {
        return "ADMIN".equals(userRole);
    }

    private Restaurant getByIdEntity(String id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
    }

    private RestaurantResponse toResponse(Restaurant r) {
        return new RestaurantResponse(
                r.getId(), r.getOwnerId(), r.getName(), r.getDescription(),
                r.getAddress(), r.getPhone(), r.getImageUrl(),
                r.isActive(), r.getCreatedAt(), r.getUpdatedAt()
        );
    }
}
