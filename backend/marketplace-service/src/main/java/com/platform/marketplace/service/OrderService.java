package com.platform.marketplace.service;

import com.platform.marketplace.dto.OrderItemResponse;
import com.platform.marketplace.dto.OrderRequest;
import com.platform.marketplace.dto.OrderResponse;
import com.platform.marketplace.exception.ResourceNotFoundException;
import com.platform.marketplace.model.*;
import com.platform.marketplace.repository.CartItemRepository;
import com.platform.marketplace.repository.CartRepository;
import com.platform.marketplace.repository.OrderItemRepository;
import com.platform.marketplace.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;

    @Transactional
    public OrderResponse createOrder(OrderRequest request, String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = Order.builder()
                .userId(userId)
                .shippingAddress(request.shippingAddress())
                .status("PENDING")
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {
            Product product = productService.getByIdEntity(cartItem.getProductId());
            
            if (product.getStockQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            totalAmount = totalAmount.add(subtotal);

            OrderItem orderItem = OrderItem.builder()
                    .orderId(order.getId())
                    .productId(product.getId())
                    .productName(product.getName())
                    .quantity(cartItem.getQuantity())
                    .price(product.getPrice())
                    .subtotal(subtotal)
                    .build();
            
            orderItemRepository.save(orderItem);
            productService.updateStock(product.getId(), cartItem.getQuantity());
        }

        order.setTotalAmount(totalAmount);
        order = orderRepository.save(order);

        cartItemRepository.deleteByCartId(cart.getId());

        return toResponse(order);
    }

    public List<OrderResponse> getUserOrders(String userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    public OrderResponse getById(String id, String userId, String userRole) {
        Order order = getByIdEntity(id);
        if (!isAdmin(userRole) && !userId.equals(order.getUserId())) {
            throw new ResourceNotFoundException("Order not found");
        }
        return toResponse(order);
    }

    public List<OrderItemResponse> getOrderItems(String orderId, String userId, String userRole) {
        Order order = getByIdEntity(orderId);
        if (!isAdmin(userRole) && !userId.equals(order.getUserId())) {
            throw new ResourceNotFoundException("Order not found");
        }
        return orderItemRepository.findByOrderId(orderId).stream()
                .map(this::toItemResponse)
                .toList();
    }

    public OrderResponse updateStatus(String orderId, String status) {
        Order order = getByIdEntity(orderId);
        order.setStatus(status);
        return toResponse(orderRepository.save(order));
    }

    private boolean isAdmin(String userRole) {
        return "ADMIN".equals(userRole);
    }

    private Order getByIdEntity(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    }

    private OrderResponse toResponse(Order o) {
        return new OrderResponse(
                o.getId(), o.getUserId(), o.getTotalAmount(),
                o.getShippingAddress(), o.getStatus(),
                o.getCreatedAt(), o.getUpdatedAt()
        );
    }

    private OrderItemResponse toItemResponse(OrderItem i) {
        return new OrderItemResponse(
                i.getId(), i.getOrderId(), i.getProductId(),
                i.getProductName(), i.getQuantity(), i.getPrice(), i.getSubtotal()
        );
    }
}
