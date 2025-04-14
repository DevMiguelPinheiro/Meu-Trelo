package com.mytrello.repository;

import com.mytrello.model.Card;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CardRepository extends MongoRepository<Card, String> {
    List<Card> findByColumnIdOrderByOrderAsc(String columnId);
} 