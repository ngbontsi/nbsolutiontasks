package com.platform.auth.dto;

public record RoleRequest(
    String name,
    String description,
    boolean fullAccess,
    boolean modify,
    boolean readOnly
) {}