import React from 'react';
import styles from './board.module.css';
import { KanbanColumn } from './KanbanColumn';

export function Board() {
  return (
    <main className={styles.board}>
      <KanbanColumn title="To do" />
      <KanbanColumn title="In progress" />
      <KanbanColumn title="Done" />
    </main>
  );
}
