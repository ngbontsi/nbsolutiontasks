package com.platform.marketplace.dto;


import lombok.Builder;

import java.math.BigDecimal;
@Builder
public record CartItemDetail (
     String productId,
     String productName,
     int quantity,
     BigDecimal price,
     BigDecimal subtotal)

{}
