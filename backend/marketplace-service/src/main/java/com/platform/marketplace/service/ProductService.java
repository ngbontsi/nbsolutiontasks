package com.platform.marketplace.service;

import com.platform.marketplace.dto.ProductRequest;
import com.platform.marketplace.dto.ProductResponse;
import com.platform.marketplace.exception.ResourceNotFoundException;
import com.platform.marketplace.model.Product;
import com.platform.marketplace.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductResponse create(ProductRequest request) {
        Product product = Product.builder()
                .name(request.name())
                .description(request.description())
                .price(BigDecimal.valueOf(request.price()))
                .stockQuantity(request.stockQuantity())
                .categoryId(request.categoryId())
                .imageUrl(request.imageUrl())
                .brand(request.brand())
                .build();
        return toResponse(productRepository.save(product));
    }

    public List<ProductResponse> getAll() {
        return productRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ProductResponse> getActive() {
        return productRepository.findByActiveTrue().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ProductResponse> getByCategory(String categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ProductResponse> search(String query) {
        return productRepository.findByNameContainingIgnoreCase(query).stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse getById(String id) {
        return toResponse(productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found")));
    }

    public ProductResponse update(String id, ProductRequest request) {
        Product product = getByIdEntity(id);
        product.setName(request.name());
        product.setDescription(request.description());
        if (request.price() != null) {
            product.setPrice(BigDecimal.valueOf(request.price()));
        }
        product.setStockQuantity(request.stockQuantity());
        product.setCategoryId(request.categoryId());
        product.setImageUrl(request.imageUrl());
        product.setBrand(request.brand());
        return toResponse(productRepository.save(product));
    }

    public void delete(String id) {
        Product product = getByIdEntity(id);
        product.setActive(false);
        productRepository.save(product);
    }

    void updateStock(String id, int quantity) {
        Product product = getByIdEntity(id);
        product.setStockQuantity(product.getStockQuantity() - quantity);
        productRepository.save(product);
    }

    Product getByIdEntity(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private ProductResponse toResponse(Product p) {
        return new ProductResponse(
                p.getId(), p.getName(), p.getDescription(),
                p.getPrice(), p.getStockQuantity(), p.getCategoryId(),
                p.getImageUrl(), p.getBrand(), p.getRating(), p.getReviewCount(),
                p.isActive(), p.getCreatedAt(), p.getUpdatedAt()
        );
    }
}