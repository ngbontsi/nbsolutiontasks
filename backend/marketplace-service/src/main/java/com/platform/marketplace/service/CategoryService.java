package com.platform.marketplace.service;

import com.platform.marketplace.dto.CategoryRequest;
import com.platform.marketplace.dto.CategoryResponse;
import com.platform.marketplace.exception.ResourceNotFoundException;
import com.platform.marketplace.model.Category;
import com.platform.marketplace.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryResponse create(CategoryRequest request) {
        Category category = Category.builder()
                .name(request.name())
                .description(request.description())
                .imageUrl(request.imageUrl())
                .build();
        return toResponse(categoryRepository.save(category));
    }

    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<CategoryResponse> getActive() {
        return categoryRepository.findByActiveTrue().stream()
                .map(this::toResponse)
                .toList();
    }

    public CategoryResponse getById(String id) {
        return toResponse(categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found")));
    }

    public CategoryResponse update(String id, CategoryRequest request) {
        Category category = getByIdEntity(id);
        category.setName(request.name());
        category.setDescription(request.description());
        category.setImageUrl(request.imageUrl());
        return toResponse(categoryRepository.save(category));
    }

    public void delete(String id) {
        Category category = getByIdEntity(id);
        category.setActive(false);
        categoryRepository.save(category);
    }

    private Category getByIdEntity(String id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    private CategoryResponse toResponse(Category c) {
        return new CategoryResponse(
                c.getId(), c.getName(), c.getDescription(),
                c.getImageUrl(), c.isActive(), c.getCreatedAt()
        );
    }
}