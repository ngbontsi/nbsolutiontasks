package com.platform.marketplace.config;

import jakarta.persistence.EntityManager;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class RlsAspect {

    private final EntityManager entityManager;

    public RlsAspect(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Before("execution(* com.platform.marketplace.repository.*.*(..))")
    public void setRlsContext() {
        String userId = UserContext.getUserId();
        String userRole = UserContext.getUserRole();

        entityManager.createNativeQuery("SELECT set_config('app.current_user_id', ?1, true)")
            .setParameter(1, userId != null ? userId : "")
            .getSingleResult();
        entityManager.createNativeQuery("SELECT set_config('app.current_user_role', ?1, true)")
            .setParameter(1, userRole != null ? userRole : "")
            .getSingleResult();
    }
}
