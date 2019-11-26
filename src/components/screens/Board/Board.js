import React from 'react';
import { BoardStateContext } from '../../context/BoardProvider';
import styles from './board.module.css';
import { KanbanColumn } from './KanbanColumn';

export function Board() {
  const state = React.useContext(BoardStateContext);
  return (
    <main className={styles.board}>
      {Object.keys(state.columns).map(colId => {
        const column = state.columns[colId];
        return (
          <KanbanColumn
            key={column.id}
            colId={column.id}
            title={column.title}
          />
        );
      })}
    </main>
  );
}
