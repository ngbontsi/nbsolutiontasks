package com.platform.auth.config;

import com.platform.auth.model.Role;
import com.platform.auth.model.User;
import com.platform.auth.repository.RoleRepository;
import com.platform.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (roleRepository.count() > 0) return;

        Role adminRole = roleRepository.save(Role.builder().name("ADMIN").description("Full platform access")
                .fullAccess(true).modify(true).readOnly(false).build());
        roleRepository.save(Role.builder().name("USER").description("Standard platform user")
                .fullAccess(false).modify(false).readOnly(true).build());
        roleRepository.save(Role.builder().name("RESTAURANT_OWNER").description("Manages restaurant content")
                .fullAccess(false).modify(true).readOnly(false).build());
        roleRepository.save(Role.builder().name("GUESTHOUSE_OWNER").description("Manages guesthouse content")
                .fullAccess(false).modify(true).readOnly(false).build());

        if (userRepository.count() == 0) {
            userRepository.save(User.builder()
                    .email("admin@decoded.com")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("Admin")
                    .lastName("User")
                    .role(adminRole)
                    .enabled(true)
                    .build());
        }
    }
}