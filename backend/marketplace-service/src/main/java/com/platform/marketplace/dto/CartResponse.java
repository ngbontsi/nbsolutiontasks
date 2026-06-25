package com.platform.marketplace.dto;


import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;
@Builder
public record CartResponse(String id,
                           String userId,
                           List<CartItemDetail> items,
                           BigDecimal totalPrice) {

}
