
package com.buddy.taskmanager.service;

import com.buddy.taskmanager.dto.TaskDto;
import com.buddy.taskmanager.entity.Task;
import com.buddy.taskmanager.mapper.TaskMapper;
import com.buddy.taskmanager.repository.TaskRepository;
import com.buddy.taskmanager.kafka.TaskProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repo;
    private final TaskMapper mapper;
    private final TaskProducer kafkaProducer;

    @Override
    public List<TaskDto> getAll() {
        return repo.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto save(TaskDto dto) {
        Task task = mapper.toEntity(dto);
        Task saved = repo.save(task);
        kafkaProducer.sendTaskEvent("Task saved: " + saved.getTitle());
        return mapper.toDto(saved);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
        kafkaProducer.sendTaskEvent("Task deleted: " + id);
    }
}
