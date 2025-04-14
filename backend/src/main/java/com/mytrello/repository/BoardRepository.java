package com.mytrello.repository;

import com.mytrello.model.Board;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import java.util.Optional;

public interface BoardRepository extends MongoRepository<Board, String> {
    List<Board> findByOwnerId(String ownerId);
    List<Board> findByMemberIdsContaining(String memberId);
    
    @Query("{'title': {$regex: ?0, $options: 'i'}}")
    List<Board> findByTitleContainingIgnoreCase(String title);
    
    Optional<Board> findByIdAndOwnerId(String id, String ownerId);
    
    @Query("{'$or': [{'ownerId': ?0}, {'memberIds': ?0}]}")
    List<Board> findAllAccessibleBoards(String userId);
    
    List<Board> findByOrderByUpdatedAtDesc();
} 