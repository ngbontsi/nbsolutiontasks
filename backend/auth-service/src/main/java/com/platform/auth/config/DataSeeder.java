package com.platform.auth.config;

import com.platform.auth.model.Role;
import com.platform.auth.repository.RoleRepository;
import com.platform.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        Role adminRole = seedRole("ADMIN", "Full platform access", true, true, false);
        seedRole("USER", "Standard platform user", false, false, true);
        seedRole("RESTAURANT_OWNER", "Manages restaurant content", false, true, false);
        seedRole("GUESTHOUSE_OWNER", "Manages guesthouse content", false, true, false);
        seedRole("MARKETPLACE_VENDOR", "Manages marketplace content", false, true, false);
        seedRole("SUPERVISOR", "Oversees platform content", false, true, false);
        seedRole("MANAGER", "Manages platform operations", true, true, false);

        if (userRepository.count() == 0) {
            jdbcTemplate.update(
                    "INSERT INTO users (id, email, password, first_name, last_name, role_id, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    "678b828b-f0d6-405e-ad70-de568e852cd7",
                    "admin@decoded.com",
                    passwordEncoder.encode("admin123"),
                    "Admin",
                    "User",
                    adminRole.getId(),
                    true,
                    LocalDateTime.now(),
                    LocalDateTime.now());
        }
    }

    private Role seedRole(String name, String description, boolean fullAccess, boolean modify, boolean readOnly) {
        return roleRepository.findByName(name).orElseGet(() ->
                roleRepository.save(Role.builder()
                        .name(name)
                        .description(description)
                        .fullAccess(fullAccess)
                        .modify(modify)
                        .readOnly(readOnly)
                        .build()));
    }
}
