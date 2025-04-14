package com.mytrello.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;
import java.time.LocalDateTime;

public class CardDTO {

    @Value
    public static class Request {
        @NotBlank(message = "Title is required")
        String title;
        
        String description;
        
        @NotNull(message = "Column ID is required")
        String columnId;
        
        Integer order;
    }

    @Value
    public static class Update {
        String title;
        String description;
        String columnId;
        Integer order;
    }

    @Value
    public static class Response {
        String id;
        String title;
        String description;
        String columnId;
        Integer order;
        LocalDateTime createdAt;
        LocalDateTime updatedAt;
    }
} 