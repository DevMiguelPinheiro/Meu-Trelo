package com.mytrello.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "boards")
public class Board {
    @Id
    private String id;
    private String title;
    private String description;
    private String ownerId; // ID do usuário que criou o board
    private List<String> memberIds; // IDs dos usuários que têm acesso ao board
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 