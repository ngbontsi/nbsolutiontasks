package com.platform.marketplace.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderResponse(
    String id,
    String userId,
    BigDecimal totalAmount,
    String shippingAddress,
    String status,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}