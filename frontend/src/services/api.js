import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Board operations
export const getBoards = async () => {
  try {
    const response = await api.get('/boards');
    return response.data;
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

export const getBoard = async (id) => {
  try {
    const response = await api.get(`/boards/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching board:', error);
    throw error;
  }
};

export const createBoard = async (title, description) => {
  const response = await api.post('/boards/', { title, description });
  return response.data;
};

export const updateBoard = async (id, title, description, order) => {
  const response = await api.put(`/boards/${id}`, { title, description, order });
  return response.data;
};

export const updateBoardOrder = async (id, order) => {
  const response = await api.put(`/boards/${id}/order`, { order });
  return response.data;
};

export const deleteBoard = async (id) => {
  const response = await api.delete(`/boards/${id}`);
  return response.data;
};

// Column operations
export const getColumns = async (boardId) => {
  const response = await api.get(`/columns/board/${boardId}`);
  return response.data;
};

export const createColumn = async (title, boardId, order) => {
  const response = await api.post('/columns/', { title, boardId, order });
  return response.data;
};

export const updateColumn = async (id, title, order) => {
  const response = await api.put(`/columns/${id}`, { title, order });
  return response.data;
};

export const deleteColumn = async (id) => {
  const response = await api.delete(`/columns/${id}`);
  return response.data;
};

// Card operations
export const getCards = async (columnId) => {
  const response = await api.get(`/cards/column/${columnId}`);
  return response.data;
};

export const createCard = async (content, columnId, order) => {
  const response = await api.post('/cards/', { content, columnId, order });
  return response.data;
};

export const updateCard = async (id, content, columnId, order) => {
  const response = await api.put(`/cards/${id}`, { content, columnId, order });
  return response.data;
};

export const deleteCard = async (id) => {
  const response = await api.delete(`/cards/${id}`);
  return response.data;
}; 