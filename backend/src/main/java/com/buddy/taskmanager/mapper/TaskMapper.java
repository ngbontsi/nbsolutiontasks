
package com.buddy.taskmanager.mapper;

import com.buddy.taskmanager.dto.TaskDto;
import com.buddy.taskmanager.entity.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskDto toDto(Task task);
    Task toEntity(TaskDto dto);
}
