package com.platform.restaurant.service;

import com.platform.restaurant.dto.MenuItemRequest;
import com.platform.restaurant.dto.MenuItemResponse;
import com.platform.restaurant.dto.RestaurantResponse;
import com.platform.restaurant.exception.ResourceNotFoundException;
import com.platform.restaurant.model.MenuItem;
import com.platform.restaurant.model.Restaurant;
import com.platform.restaurant.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuItemRepository menuItemRepository;

    public MenuItemResponse create(MenuItemRequest request) {
        MenuItem item = MenuItem.builder()
                .restaurantId(request.restaurantId())
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

    public MenuItemResponse getById(String id) {
        return toResponse(menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found")));
    }

    public MenuItemResponse update(String id, MenuItemRequest request) {
        MenuItem item = getByIdEntity(id);
        item.setName(request.name());
        item.setDescription(request.description());
        item.setPrice(request.price() != null ? java.math.BigDecimal.valueOf(request.price()) : null);
        item.setCategory(request.category());
        item.setImageUrl(request.imageUrl());
        return toResponse(menuItemRepository.save(item));
    }

    public void delete(String id) {
        MenuItem item = getByIdEntity(id);
        item.setAvailable(false);
        menuItemRepository.save(item);
    }
    public List<MenuItemResponse> getAvailable(String resturantId){
     return  menuItemRepository.findByRestaurantIdAndAvailableTrue(resturantId).stream()
             .map(this::toResponse)
             .toList();
    }

    private MenuItem getByIdEntity(String id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
    }
    private MenuItemResponse toResponse(MenuItem r) {
        return new MenuItemResponse(
                r.getId(), r.getRestaurantId(), r.getName(),
                r.getDescription(), r.getPrice(), r.getCategory(),
                r.getImageUrl(), r.isAvailable(), r.getCreatedAt()
        );
    }
}
