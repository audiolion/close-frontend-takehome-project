import React from 'react';
import { Header } from './layout/Header';
import { Board } from './screens/Board';
import { BoardProvider } from './context/BoardProvider';

function App() {
  return (
    <>
      <Header />
      <BoardProvider>
        <Board />
      </BoardProvider>
    </>
  );
}

export default App;
