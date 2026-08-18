package com.platform.restaurant.service;

import com.platform.restaurant.dto.MenuItemRequest;
import com.platform.restaurant.dto.MenuItemResponse;
import com.platform.restaurant.exception.ResourceNotFoundException;
import com.platform.restaurant.model.MenuItem;
import com.platform.restaurant.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuItemRepository menuItemRepository;

    public MenuItemResponse create(MenuItemRequest request, String ownerId) {
        MenuItem item = MenuItem.builder()
                .restaurantId(request.restaurantId())
                .ownerId(ownerId)
                .name(request.name())
                .description(request.description())
                .price(request.price() != null ? java.math.BigDecimal.valueOf(request.price()) : null)
                .category(request.category())
                .imageUrl(request.imageUrl())
                .build();
        return toResponse(menuItemRepository.save(item));
    }

    public List<MenuItemResponse> getByRestaurant(String restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId).stream()
                .map(this::toResponse)
                .toList();
    }

    public MenuItemResponse getById(String id, String userId, String userRole) {
        MenuItem item = getByIdEntity(id);
        if (!isAdmin(userRole) && userId != null && !userId.equals(item.getOwnerId())) {
            throw new ResourceNotFoundException("Menu item not found");
        }
        return toResponse(item);
    }

    public MenuItemResponse update(String id, MenuItemRequest request, String userId, String userRole) {
        MenuItem item = getByIdEntity(id);
        if (!isAdmin(userRole) && !userId.equals(item.getOwnerId())) {
            throw new ResourceNotFoundException("Menu item not found");
        }
        item.setName(request.name());
        item.setDescription(request.description());
        item.setPrice(request.price() != null ? java.math.BigDecimal.valueOf(request.price()) : null);
        item.setCategory(request.category());
        item.setImageUrl(request.imageUrl());
        return toResponse(menuItemRepository.save(item));
    }

    public void delete(String id, String userId, String userRole) {
        MenuItem item = getByIdEntity(id);
        if (!isAdmin(userRole) && !userId.equals(item.getOwnerId())) {
            throw new ResourceNotFoundException("Menu item not found");
        }
        item.setAvailable(false);
        menuItemRepository.save(item);
    }

    public List<MenuItemResponse> getAvailable(String restaurantId) {
        return menuItemRepository.findByRestaurantIdAndAvailableTrue(restaurantId).stream()
                .map(this::toResponse)
                .toList();
    }

    private boolean isAdmin(String userRole) {
        return "ADMIN".equals(userRole);
    }

    private MenuItem getByIdEntity(String id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));
    }

    private MenuItemResponse toResponse(MenuItem r) {
        return new MenuItemResponse(
                r.getId(), r.getRestaurantId(), r.getOwnerId(), r.getName(),
                r.getDescription(), r.getPrice(), r.getCategory(),
                r.getImageUrl(), r.isAvailable(), r.getCreatedAt()
        );
    }
}
