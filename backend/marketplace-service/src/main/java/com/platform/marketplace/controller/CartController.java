package com.platform.marketplace.controller;

import com.platform.marketplace.dto.CartItemRequest;
import com.platform.marketplace.dto.CartResponse;
import com.platform.marketplace.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/my")
    public ResponseEntity<CartResponse> getMyCart(
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping
    public ResponseEntity<CartResponse> addToCart(
            @Valid @RequestBody CartItemRequest request,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(cartService.addToCart(request, userId));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<CartResponse> updateCartItem(
            @PathVariable String productId,
            @RequestParam int quantity,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(cartService.updateCartItem(userId, productId, quantity));
    }

    @DeleteMapping("/my")
    public ResponseEntity<Void> clearCart(
            @RequestHeader("X-User-Id") String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
