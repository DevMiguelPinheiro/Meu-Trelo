package com.mytrello.repository;

import com.mytrello.model.Column;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ColumnRepository extends MongoRepository<Column, String> {
    List<Column> findByBoardIdOrderByOrderAsc(String boardId);
} 