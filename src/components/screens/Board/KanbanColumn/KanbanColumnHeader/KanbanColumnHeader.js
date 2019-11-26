import React from 'react';
import styles from './kanban-column-header.module.css';

export const KanbanColumnHeader = ({ title, onOpenCardForm }) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.heading}>{title}</h2>
      <button type="button" onClick={onOpenCardForm}>
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0v24M0 12h24" stroke="#222" strokeWidth="4" />
        </svg>
      </button>
    </header>
  );
};
