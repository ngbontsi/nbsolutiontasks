
package com.buddy.taskmanager.config;

import com.buddy.taskmanager.dto.TaskDto;
import com.buddy.taskmanager.service.TaskService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder {

    private final TaskService taskService;

    @PostConstruct
    public void seedData() {
        if (taskService.getAll().isEmpty()) {
            System.out.println("🌱 Seeding initial task data...");

            TaskDto t1 = new TaskDto();
            t1.setTitle("Aunt's Restaurant Website");
            t1.setClient("Family Project");
            t1.setStatus("Completed");
            t1.setRequestedDate("2025-01-05");
            t1.setDueDate("2025-01-20");
            t1.setProgress("100%");

            TaskDto t2 = new TaskDto();
            t2.setTitle("Guest House App");
            t2.setClient("Local Guest House");
            t2.setStatus("In Progress");
            t2.setRequestedDate("2025-02-10");
            t2.setDueDate("2025-03-01");
            t2.setProgress("60%");

            TaskDto t3 = new TaskDto();
            t3.setTitle("Personal Task Manager App");
            t3.setClient("Internal Project");
            t3.setStatus("To-Do");
            t3.setRequestedDate("2025-10-19");
            t3.setDueDate("2025-11-01");
            t3.setProgress("0%");

            taskService.save(t1);
            taskService.save(t2);
            taskService.save(t3);

            System.out.println("✅ Initial tasks seeded successfully!");
        }
    }
}
