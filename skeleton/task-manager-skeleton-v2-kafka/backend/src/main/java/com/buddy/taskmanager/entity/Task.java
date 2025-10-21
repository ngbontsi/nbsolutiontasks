
package com.buddy.taskmanager.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String client;
    private String status;
    private String requestedDate;
    private String dueDate;
    private String progress;
}
