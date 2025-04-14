package com.mytrello.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;
import java.time.LocalDateTime;

public class ColumnDTO {

    @Value
    public static class Request {
        @NotBlank(message = "Title is required")
        String title;
        
        @NotNull(message = "Board ID is required")
        String boardId;
        
        Integer order;
    }

    @Value
    public static class Update {
        String title;
        Integer order;
    }

    @Value
    public static class Response {
        String id;
        String title;
        String boardId;
        Integer order;
        LocalDateTime createdAt;
        LocalDateTime updatedAt;
    }
} 