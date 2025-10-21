
package com.buddy.taskmanager.controller;

import com.buddy.taskmanager.dto.TaskDto;
import com.buddy.taskmanager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @GetMapping
    public List<TaskDto> getAll() {
        return service.getAll();
    }

    @PostMapping
    public TaskDto save(@RequestBody TaskDto dto) {
        return service.save(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
