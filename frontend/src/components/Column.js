import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCards, createCard, updateCard, deleteCard, updateColumn, deleteColumn } from '../services/api';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Column = ({ column, onUpdate, onDelete }) => {
  const [cards, setCards] = useState([]);
  const [newCardContent, setNewCardContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);
  const [error, setError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getCards(column._id);
      setCards(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setError('Error loading cards');
    } finally {
      setIsLoading(false);
    }
  }, [column._id]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleCreateCard = async (e) => {
    e.preventDefault();
    if (!newCardContent.trim()) return;

    try {
      setIsLoading(true);
      const newCard = await createCard(newCardContent, column._id, cards.length);
      setNewCardContent('');
      setCards(prevCards => [...prevCards, newCard]);
      setSnackbar({ open: true, message: 'Card created successfully', severity: 'success' });
    } catch (error) {
      console.error('Error creating card:', error);
      setSnackbar({ open: true, message: 'Error creating card', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateColumn = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateColumn(column._id, editTitle, column.order);
      setIsEditing(false);
      await onUpdate();
      setSnackbar({ open: true, message: 'Column updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating column:', error);
      setSnackbar({ open: true, message: 'Error updating column', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      setIsLoading(true);
      await deleteColumn(column._id);
      setOpenDeleteDialog(false);
      await onDelete();
      setSnackbar({ open: true, message: 'Column deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting column:', error);
      setSnackbar({ open: true, message: 'Error deleting column', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCard = async (cardId, content) => {
    try {
      setIsLoading(true);
      await updateCard(cardId, content, column._id, cards.find(c => c._id === cardId)?.order || 0);
      await fetchCards();
      setSnackbar({ open: true, message: 'Card updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating card:', error);
      setSnackbar({ open: true, message: 'Error updating card', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      setIsLoading(true);
      await deleteCard(cardId);
      await fetchCards();
      setSnackbar({ open: true, message: 'Card deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting card:', error);
      setSnackbar({ open: true, message: 'Error deleting card', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('sourceColumnId', column._id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetCardId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    
    if (cardId === targetCardId) return;

    try {
      setIsLoading(true);
      const targetCard = cards.find(c => c._id === targetCardId);
      const targetOrder = targetCard ? targetCard.order : cards.length;

      await updateCard(cardId, null, column._id, targetOrder);
      
      const updatedCards = await getCards(column._id);
      setCards(updatedCards);
      
      setSnackbar({ open: true, message: 'Card moved successfully', severity: 'success' });
    } catch (error) {
      console.error('Error moving card:', error);
      setSnackbar({ open: true, message: 'Error moving card', severity: 'error' });
      await fetchCards();
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        {isEditing ? (
          <Box component="form" onSubmit={handleUpdateColumn} sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
              size="small"
              disabled={isLoading}
            />
          </Box>
        ) : (
          <Typography variant="h6" component="h2">
            {column.title}
          </Typography>
        )}
        <Box>
          <IconButton onClick={() => setIsEditing(true)} size="small" disabled={isLoading}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => setOpenDeleteDialog(true)} size="small" color="error" disabled={isLoading}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }} onDragOver={handleDragOver}>
        {cards.map((card) => (
          <Paper
            key={card._id}
            elevation={1}
            sx={{ p: 2, mb: 1, cursor: isLoading ? 'not-allowed' : 'move' }}
            draggable={!isLoading}
            onDragStart={(e) => handleDragStart(e, card._id)}
            onDrop={(e) => handleDrop(e, card._id)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>{card.content}</Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => handleUpdateCard(card._id, prompt('Enter new content:', card.content))}
                  disabled={isLoading}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDeleteCard(card._id)} color="error" disabled={isLoading}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Box component="form" onSubmit={handleCreateCard}>
        <TextField
          fullWidth
          size="small"
          value={newCardContent}
          onChange={(e) => setNewCardContent(e.target.value)}
          placeholder="New card content"
          required
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth
          sx={{ mt: 1 }}
          disabled={isLoading}
        >
          Add Card
        </Button>
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Column</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this column? All cards in this column will be deleted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleDeleteColumn} color="error" variant="contained" disabled={isLoading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Column; 