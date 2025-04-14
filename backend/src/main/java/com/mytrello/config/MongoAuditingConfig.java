package com.mytrello.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.domain.AuditorAware;
import java.util.Optional;

@Configuration
@EnableMongoAuditing
public class MongoAuditingConfig {

    @Bean
    public AuditorAware<String> auditorProvider() {
        // For now, return a default system user. In the future, this can be updated
        // to return the currently authenticated user
        return () -> Optional.of("system");
    }
} 