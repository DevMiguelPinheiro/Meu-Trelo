package com.mytrello.service;

import com.mytrello.dto.ColumnDTO;
import com.mytrello.model.Column;
import com.mytrello.repository.ColumnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ColumnService {

    private final ColumnRepository columnRepository;

    public ColumnDTO.Response getColumn(String id) {
        return columnRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Column not found with id: " + id));
    }

    public List<ColumnDTO.Response> getColumnsByBoard(String boardId) {
        return columnRepository.findByBoardIdOrderByOrderAsc(boardId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ColumnDTO.Response createColumn(ColumnDTO.Request request) {
        Column column = new Column();
        column.setTitle(request.getTitle());
        column.setBoardId(request.getBoardId());
        column.setOrder(request.getOrder());
        column.setCreatedAt(LocalDateTime.now());
        column.setUpdatedAt(LocalDateTime.now());
        
        Column saved = columnRepository.save(column);
        return mapToResponse(saved);
    }

    @Transactional
    public ColumnDTO.Response updateColumn(String id, ColumnDTO.Update update) {
        Column column = columnRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Column not found with id: " + id));

        if (update.getTitle() != null) {
            column.setTitle(update.getTitle());
        }
        if (update.getOrder() != null) {
            column.setOrder(update.getOrder());
        }
        column.setUpdatedAt(LocalDateTime.now());

        Column updated = columnRepository.save(column);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteColumn(String id) {
        if (!columnRepository.existsById(id)) {
            throw new RuntimeException("Column not found with id: " + id);
        }
        columnRepository.deleteById(id);
    }

    private ColumnDTO.Response mapToResponse(Column column) {
        return new ColumnDTO.Response(
            column.getId(),
            column.getTitle(),
            column.getBoardId(),
            column.getOrder(),
            column.getCreatedAt(),
            column.getUpdatedAt()
        );
    }
} 