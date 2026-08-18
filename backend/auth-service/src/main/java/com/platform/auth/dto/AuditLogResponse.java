package com.platform.auth.dto;

public record AuditLogResponse(
    String id,
    String actorId,
    String actorEmail,
    String action,
    String targetId,
    String targetType,
    String details,
    String createdAt
) {}
