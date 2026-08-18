package com.platform.gateway.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class TokenBlacklistService {

    private static final String PREFIX = "blacklisted:";

    private final ReactiveRedisTemplate<String, String> redis;

    public TokenBlacklistService(@Qualifier("reactiveStringRedisTemplate") ReactiveRedisTemplate<String, String> redis) {
        this.redis = redis;
    }

    public Mono<Void> blacklist(String token, Duration ttl) {
        return redis.opsForValue().set(PREFIX + token, "1", ttl).then();
    }

    public Mono<Boolean> isBlacklisted(String token) {
        return redis.hasKey(PREFIX + token);
    }
}
