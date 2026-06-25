package com.platform.marketplace.dto;

public record ProductRequest( String name,
                             String description,
                             Double price,
                             Integer stockQuantity,
                             String categoryId,
                             String imageUrl,
                             String brand) {

}
