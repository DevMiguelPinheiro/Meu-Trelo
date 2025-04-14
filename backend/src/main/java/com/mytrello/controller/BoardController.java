package com.mytrello.controller;

import com.mytrello.dto.BoardDTO;
import com.mytrello.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO.Response> getBoard(@PathVariable String id) {
        return ResponseEntity.ok(boardService.getBoard(id));
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<BoardDTO.Response>> getBoardsByOwner(@PathVariable String ownerId) {
        return ResponseEntity.ok(boardService.getBoardsByOwner(ownerId));
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<BoardDTO.Response>> getBoardsByMember(@PathVariable String memberId) {
        return ResponseEntity.ok(boardService.getBoardsByMember(memberId));
    }

    @PostMapping
    public ResponseEntity<BoardDTO.Response> createBoard(@Valid @RequestBody BoardDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(boardService.createBoard(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardDTO.Response> updateBoard(
            @PathVariable String id,
            @Valid @RequestBody BoardDTO.Update update) {
        return ResponseEntity.ok(boardService.updateBoard(id, update));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable String id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }
} 