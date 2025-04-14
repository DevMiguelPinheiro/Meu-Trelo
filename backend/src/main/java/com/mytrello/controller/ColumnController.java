package com.mytrello.controller;

import com.mytrello.dto.ColumnDTO;
import com.mytrello.service.ColumnService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/columns")
@RequiredArgsConstructor
public class ColumnController {

    private final ColumnService columnService;

    @GetMapping("/{id}")
    public ResponseEntity<ColumnDTO.Response> getColumn(@PathVariable String id) {
        return ResponseEntity.ok(columnService.getColumn(id));
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<ColumnDTO.Response>> getColumnsByBoard(@PathVariable String boardId) {
        return ResponseEntity.ok(columnService.getColumnsByBoard(boardId));
    }

    @PostMapping
    public ResponseEntity<ColumnDTO.Response> createColumn(@Valid @RequestBody ColumnDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(columnService.createColumn(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ColumnDTO.Response> updateColumn(
            @PathVariable String id,
            @Valid @RequestBody ColumnDTO.Update update) {
        return ResponseEntity.ok(columnService.updateColumn(id, update));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColumn(@PathVariable String id) {
        columnService.deleteColumn(id);
        return ResponseEntity.noContent().build();
    }
} 