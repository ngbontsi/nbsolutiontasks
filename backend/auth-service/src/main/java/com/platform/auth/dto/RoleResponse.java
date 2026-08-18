package com.platform.auth.dto;

public record RoleResponse(
    String id,
    String name,
    String description,
    boolean fullAccess,
    boolean modify,
    boolean readOnly
) {}