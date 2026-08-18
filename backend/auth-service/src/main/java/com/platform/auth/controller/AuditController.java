package com.platform.auth.controller;

import com.platform.auth.dto.AuditLogResponse;
import com.platform.auth.service.AuditService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/audit")
@RequiredArgsConstructor
@Tag(name = "Audit Logs", description = "Audit trail endpoints")
public class AuditController {

    private final AuditService auditService;

    @GetMapping
    @Operation(summary = "Get audit logs", description = "Retrieves paginated audit log entries")
    public ResponseEntity<Page<AuditLogResponse>> getLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok(auditService.getLogs(page, size));
    }
}
