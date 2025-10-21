
package com.buddy.taskmanager.service;

import com.buddy.taskmanager.dto.TaskDto;
import java.util.List;

public interface TaskService {
    List<TaskDto> getAll();
    TaskDto save(TaskDto dto);
    void delete(Long id);
}
