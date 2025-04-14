package com.mytrello.controller;

import com.mytrello.dto.CardDTO;
import com.mytrello.service.CardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping("/{id}")
    public ResponseEntity<CardDTO.Response> getCard(@PathVariable String id) {
        return ResponseEntity.ok(cardService.getCard(id));
    }

    @GetMapping("/column/{columnId}")
    public ResponseEntity<List<CardDTO.Response>> getCardsByColumn(@PathVariable String columnId) {
        return ResponseEntity.ok(cardService.getCardsByColumn(columnId));
    }

    @PostMapping
    public ResponseEntity<CardDTO.Response> createCard(@Valid @RequestBody CardDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cardService.createCard(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CardDTO.Response> updateCard(
            @PathVariable String id,
            @Valid @RequestBody CardDTO.Update update) {
        return ResponseEntity.ok(cardService.updateCard(id, update));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable String id) {
        cardService.deleteCard(id);
        return ResponseEntity.noContent().build();
    }
} 