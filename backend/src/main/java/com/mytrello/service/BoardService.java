package com.mytrello.service;

import com.mytrello.dto.BoardDTO;
import com.mytrello.model.Board;
import com.mytrello.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardDTO.Response getBoard(String id) {
        return boardRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + id));
    }

    public List<BoardDTO.Response> getBoardsByOwner(String ownerId) {
        return boardRepository.findByOwnerId(ownerId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BoardDTO.Response> getBoardsByMember(String memberId) {
        return boardRepository.findByMemberIdsContaining(memberId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public BoardDTO.Response createBoard(BoardDTO.Request request) {
        Board board = new Board();
        board.setTitle(request.getTitle());
        board.setDescription(request.getDescription());
        board.setOwnerId(request.getOwnerId());
        board.setMemberIds(request.getMemberIds());
        board.setCreatedAt(LocalDateTime.now());
        board.setUpdatedAt(LocalDateTime.now());
        
        Board saved = boardRepository.save(board);
        return mapToResponse(saved);
    }

    @Transactional
    public BoardDTO.Response updateBoard(String id, BoardDTO.Update update) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + id));

        if (update.getTitle() != null) {
            board.setTitle(update.getTitle());
        }
        if (update.getDescription() != null) {
            board.setDescription(update.getDescription());
        }
        if (update.getMemberIds() != null) {
            board.setMemberIds(update.getMemberIds());
        }
        board.setUpdatedAt(LocalDateTime.now());

        Board updated = boardRepository.save(board);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteBoard(String id) {
        if (!boardRepository.existsById(id)) {
            throw new RuntimeException("Board not found with id: " + id);
        }
        boardRepository.deleteById(id);
    }

    private BoardDTO.Response mapToResponse(Board board) {
        return new BoardDTO.Response(
            board.getId(),
            board.getTitle(),
            board.getDescription(),
            board.getOwnerId(),
            board.getMemberIds(),
            board.getCreatedAt(),
            board.getUpdatedAt()
        );
    }
} 