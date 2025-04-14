import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Board from './components/Board';
import BoardList from './components/BoardList';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0079bf',
    },
    secondary: {
      main: '#5e6c84',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<BoardList />} />
            <Route path="/boards/:boardId" element={<Board />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 