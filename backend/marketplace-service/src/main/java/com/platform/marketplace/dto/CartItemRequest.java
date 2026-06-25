package com.platform.marketplace.dto;


public record CartItemRequest(String userId,
                              String productId,
                              Integer quantity) {

}
