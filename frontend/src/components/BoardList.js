import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBoards, createBoard, updateBoardOrder } from '../services/api';

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const data = await getBoards();
    setBoards(data);
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;

    await createBoard(newBoardTitle, newBoardDescription);
    setNewBoardTitle('');
    setNewBoardDescription('');
    fetchBoards();
  };

  const handleDragStart = (e, boardId) => {
    e.dataTransfer.setData('boardId', boardId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetBoardId) => {
    e.preventDefault();
    const draggedBoardId = e.dataTransfer.getData('boardId');
    
    if (draggedBoardId === targetBoardId) return;

    const draggedBoard = boards.find(b => b._id === draggedBoardId);
    const targetBoard = boards.find(b => b._id === targetBoardId);
    
    if (!draggedBoard || !targetBoard) return;

    const newOrder = targetBoard.order;
    await updateBoardOrder(draggedBoardId, newOrder);
    fetchBoards();
  };

  return (
    <div className="board-list">
      <h2>Boards</h2>
      <form onSubmit={handleCreateBoard}>
        <input
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          placeholder="New board title"
        />
        <input
          type="text"
          value={newBoardDescription}
          onChange={(e) => setNewBoardDescription(e.target.value)}
          placeholder="New board description"
        />
        <button type="submit">Create Board</button>
      </form>
      <div className="boards">
        {boards.map((board) => (
          <div
            key={board._id}
            className="board-card"
            draggable
            onDragStart={(e) => handleDragStart(e, board._id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, board._id)}
          >
            <Link to={`/boards/${board._id}`}>
              <h3>{board.title}</h3>
              <p>{board.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardList; 