
package com.buddy.taskmanager.dto;

import lombok.Data;

@Data
public class TaskDto {
    private Long id;
    private String title;
    private String client;
    private String status;
    private String requestedDate;
    private String dueDate;
    private String progress;
}
