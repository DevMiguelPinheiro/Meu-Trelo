package com.mytrello.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "columns")
public class Column {
    @Id
    private String id;
    private String title;
    private String boardId;
    private Integer order;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 