import React from 'react';
import { Header } from './layout/Header';
import { Board } from './screens/Board';
import { BoardProvider } from './context/BoardProvider';

function App() {
  return (
    <BoardProvider>
      <Header />
      <Board />
    </BoardProvider>
  );
}

export default App;
