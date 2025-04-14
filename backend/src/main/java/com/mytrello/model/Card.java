package com.mytrello.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "cards")
public class Card {
    @Id
    private String id;
    private String title;
    private String description;
    private String columnId;
    private Integer order;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 