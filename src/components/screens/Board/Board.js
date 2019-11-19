import React from 'react';
import styles from './board.module.css';

export function Board() {
  return (
    <main className={styles.board}>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
    </main>
  );
}
