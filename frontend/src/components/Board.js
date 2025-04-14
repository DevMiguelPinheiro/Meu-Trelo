import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoard, updateBoard, deleteBoard, getColumns, createColumn, updateColumn } from '../services/api';
import Column from './Column';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [error, setError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchBoard = useCallback(async () => {
    if (!boardId) {
      setError('No board ID provided');
      return;
    }

    try {
      const data = await getBoard(boardId);
      setBoard(data);
      setEditTitle(data.title);
      setEditDescription(data.description);
      setError(null);
    } catch (error) {
      console.error('Error fetching board:', error);
      setError('Error loading board');
      navigate('/');
    }
  }, [boardId, navigate]);

  const fetchColumns = useCallback(async () => {
    if (!boardId) return;

    try {
      const data = await getColumns(boardId);
      setColumns(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching columns:', error);
      setError('Error loading columns');
    }
  }, [boardId]);

  useEffect(() => {
    if (boardId) {
      fetchBoard();
      fetchColumns();
    }
  }, [boardId, fetchBoard, fetchColumns]);

  const handleCreateColumn = async (e) => {
    e.preventDefault();
    if (!newColumnTitle.trim() || !boardId) return;

    try {
      await createColumn(newColumnTitle, boardId, columns.length);
      setNewColumnTitle('');
      fetchColumns();
      setSnackbar({ open: true, message: 'Column created successfully', severity: 'success' });
    } catch (error) {
      console.error('Error creating column:', error);
      setSnackbar({ open: true, message: 'Error creating column', severity: 'error' });
    }
  };

  const handleUpdateBoard = async (e) => {
    e.preventDefault();
    if (!boardId) return;

    try {
      await updateBoard(boardId, editTitle, editDescription, board?.order || 0);
      setIsEditing(false);
      fetchBoard();
      setSnackbar({ open: true, message: 'Board updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating board:', error);
      setSnackbar({ open: true, message: 'Error updating board', severity: 'error' });
    }
  };

  const handleDeleteBoard = async () => {
    if (!boardId) return;

    try {
      await deleteBoard(boardId);
      setOpenDeleteDialog(false);
      navigate('/');
      setSnackbar({ open: true, message: 'Board deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting board:', error);
      setSnackbar({ open: true, message: 'Error deleting board', severity: 'error' });
    }
  };

  const handleDragStart = (e, columnId) => {
    e.dataTransfer.setData('columnId', columnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetColumnId) => {
    e.preventDefault();
    const draggedColumnId = e.dataTransfer.getData('columnId');
    
    if (draggedColumnId === targetColumnId) return;

    const draggedColumn = columns.find(c => c._id === draggedColumnId);
    const targetColumn = columns.find(c => c._id === targetColumnId);
    
    if (!draggedColumn || !targetColumn) return;

    try {
      await updateColumn(draggedColumnId, draggedColumn.title, targetColumn.order);
      
      const updatedColumns = columns.map(col => {
        if (col._id === draggedColumnId) {
          return { ...col, order: targetColumn.order };
        }
        return col;
      });
      setColumns(updatedColumns);
      
      await fetchColumns();
      
      setSnackbar({ open: true, message: 'Column order updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating column order:', error);
      setSnackbar({ open: true, message: 'Error updating column order', severity: 'error' });
      fetchColumns();
    }
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
            },
          }}
        >
          Back to Boards
        </Button>
      </Container>
    );
  }

  if (!board) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate('/')} color="primary">
              <ArrowBackIcon />
            </IconButton>
            {isEditing ? (
              <Box component="form" onSubmit={handleUpdateBoard} sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      label="Board Title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      label="Board Description"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        border: 0,
                        borderRadius: 3,
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        color: 'white',
                        height: 48,
                        padding: '0 30px',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                        },
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  {board.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {board.description}
                </Typography>
              </Box>
            )}
          </Box>
          {!isEditing && (
            <Box>
              <IconButton 
                onClick={() => setIsEditing(true)} 
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                  },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={() => setOpenDeleteDialog(true)} 
                sx={{
                  background: 'linear-gradient(45deg, #FF1744 30%, #FF5252 90%)',
                  color: 'white',
                  ml: 1,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #D50000 30%, #FF1744 90%)',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Paper>

      <Grid container spacing={3} onDragOver={handleDragOver}>
        {columns.map((column) => (
          <Grid item xs={12} sm={6} md={4} key={column._id}>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, column._id)}
              onDrop={(e) => handleDrop(e, column._id)}
            >
              <Column column={column} onUpdate={fetchColumns} onDelete={fetchColumns} />
            </div>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Box component="form" onSubmit={handleCreateColumn} sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="New Column Title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              minWidth: '120px',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              color: 'white',
              height: 48,
              padding: '0 30px',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
              },
            }}
          >
            Add Column
          </Button>
        </Box>
      </Paper>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Board</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this board? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteBoard} 
            sx={{
              background: 'linear-gradient(45deg, #FF1744 30%, #FF5252 90%)',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(255, 23, 68, .3)',
              color: 'white',
              height: 36,
              padding: '0 20px',
              '&:hover': {
                background: 'linear-gradient(45deg, #D50000 30%, #FF1744 90%)',
              },
            }}
          >
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
    </Container>
  );
};

export default Board; 