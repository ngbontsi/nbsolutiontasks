package com.platform.marketplace.dto;

import java.math.BigDecimal;

public record OrderItemResponse(
    String id,
    String orderId,
    String productId,
    String productName,
    int quantity,
    BigDecimal price,
    BigDecimal subtotal
) {}