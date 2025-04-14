package com.mytrello.service;

import com.mytrello.dto.CardDTO;
import com.mytrello.model.Card;
import com.mytrello.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;

    public CardDTO.Response getCard(String id) {
        return cardRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Card not found with id: " + id));
    }

    public List<CardDTO.Response> getCardsByColumn(String columnId) {
        return cardRepository.findByColumnIdOrderByOrderAsc(columnId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public CardDTO.Response createCard(CardDTO.Request request) {
        Card card = new Card();
        card.setTitle(request.getTitle());
        card.setDescription(request.getDescription());
        card.setColumnId(request.getColumnId());
        card.setOrder(request.getOrder());
        card.setCreatedAt(LocalDateTime.now());
        card.setUpdatedAt(LocalDateTime.now());
        
        Card saved = cardRepository.save(card);
        return mapToResponse(saved);
    }

    @Transactional
    public CardDTO.Response updateCard(String id, CardDTO.Update update) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found with id: " + id));

        if (update.getTitle() != null) {
            card.setTitle(update.getTitle());
        }
        if (update.getDescription() != null) {
            card.setDescription(update.getDescription());
        }
        if (update.getColumnId() != null) {
            card.setColumnId(update.getColumnId());
        }
        if (update.getOrder() != null) {
            card.setOrder(update.getOrder());
        }
        card.setUpdatedAt(LocalDateTime.now());

        Card updated = cardRepository.save(card);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteCard(String id) {
        if (!cardRepository.existsById(id)) {
            throw new RuntimeException("Card not found with id: " + id);
        }
        cardRepository.deleteById(id);
    }

    private CardDTO.Response mapToResponse(Card card) {
        return new CardDTO.Response(
            card.getId(),
            card.getTitle(),
            card.getDescription(),
            card.getColumnId(),
            card.getOrder(),
            card.getCreatedAt(),
            card.getUpdatedAt()
        );
    }
} 