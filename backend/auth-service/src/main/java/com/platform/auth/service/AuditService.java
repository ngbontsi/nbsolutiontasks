package com.platform.auth.service;

import com.platform.auth.dto.AuditLogResponse;
import com.platform.auth.model.AuditLog;
import com.platform.auth.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public void log(String actorId, String actorEmail, String action,
                    String targetId, String targetType, String details) {
        auditLogRepository.save(AuditLog.builder()
                .actorId(actorId)
                .actorEmail(actorEmail)
                .action(action)
                .targetId(targetId)
                .targetType(targetType)
                .details(details)
                .build());
    }

    public Page<AuditLogResponse> getLogs(int page, int size) {
        return auditLogRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size))
                .map(this::toResponse);
    }

    private AuditLogResponse toResponse(AuditLog log) {
        return new AuditLogResponse(
                log.getId(),
                log.getActorId(),
                log.getActorEmail(),
                log.getAction(),
                log.getTargetId(),
                log.getTargetType(),
                log.getDetails(),
                log.getCreatedAt() != null ? log.getCreatedAt().toString() : null
        );
    }
}
