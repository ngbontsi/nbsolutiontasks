package com.platform.marketplace.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "order_items")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String orderId;

    @Column(nullable = false)
    private String productId;

    private String productName;

    private int quantity;

    private BigDecimal price;

    private BigDecimal subtotal;

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if(obj == null || getClass() != obj.getClass()) return false;
        OrderItem orderItem = (OrderItem) obj;
        return id !=null&& Objects.equals(orderItem.id,id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
