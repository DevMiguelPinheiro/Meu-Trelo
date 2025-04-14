package com.mytrello.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;
import java.time.LocalDateTime;
import java.util.List;

public class BoardDTO {

    @Value
    public static class Request {
        @NotBlank(message = "Title is required")
        String title;
        
        String description;
        
        @NotNull(message = "Owner ID is required")
        String ownerId;
        
        List<String> memberIds;
    }

    @Value
    public static class Update {
        String title;
        String description;
        List<String> memberIds;
    }

    @Value
    public static class Response {
        String id;
        String title;
        String description;
        String ownerId;
        List<String> memberIds;
        LocalDateTime createdAt;
        LocalDateTime updatedAt;
    }
} 