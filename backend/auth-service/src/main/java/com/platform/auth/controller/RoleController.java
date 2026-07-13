package com.platform.auth.controller;

import com.platform.auth.dto.RoleRequest;
import com.platform.auth.dto.RoleResponse;
import com.platform.auth.model.Role;
import com.platform.auth.repository.RoleRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth/roles")
@RequiredArgsConstructor
@Tag(name = "Roles", description = "Role management endpoints")
public class RoleController {

    private final RoleRepository roleRepository;

    @GetMapping
    @Operation(summary = "Get all roles", description = "Retrieves all platform roles")
    public ResponseEntity<List<RoleResponse>> getAll() {
        return roleRepository.findAll().stream()
                .map(r -> new RoleResponse(r.getId(), r.getName(), r.getDescription(),
                        r.isFullAccess(), r.isModify(), r.isReadOnly()))
                .collect(java.util.stream.Collectors.collectingAndThen(
                        java.util.stream.Collectors.toList(), ResponseEntity::ok));
    }

    @PostMapping
    @Operation(summary = "Create a role", description = "Creates a new platform role")
    public ResponseEntity<RoleResponse> create(@Valid @RequestBody RoleRequest request) {
        if (roleRepository.existsByName(request.name().toUpperCase())) {
            return ResponseEntity.badRequest().build();
        }
        Role role = roleRepository.save(
                Role.builder().name(request.name().toUpperCase()).description(request.description())
                        .fullAccess(request.fullAccess()).modify(request.modify()).readOnly(request.readOnly())
                        .build());
        return ResponseEntity.ok(new RoleResponse(role.getId(), role.getName(), role.getDescription(),
                role.isFullAccess(), role.isModify(), role.isReadOnly()));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a role", description = "Updates an existing role by its ID")
    public ResponseEntity<RoleResponse> update(@PathVariable String id, @Valid @RequestBody RoleRequest request) {
        Role role = roleRepository.findById(id).orElse(null);
        if (role == null) return ResponseEntity.notFound().build();
        role.setName(request.name().toUpperCase());
        role.setDescription(request.description());
        role.setFullAccess(request.fullAccess());
        role.setModify(request.modify());
        role.setReadOnly(request.readOnly());
        role = roleRepository.save(role);
        return ResponseEntity.ok(new RoleResponse(role.getId(), role.getName(), role.getDescription(),
                role.isFullAccess(), role.isModify(), role.isReadOnly()));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a role", description = "Deletes a role by its ID")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        roleRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
