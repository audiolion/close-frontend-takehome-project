import React from 'react';
import styles from './kanban-column.module.css';

export const KanbanColumn = ({ title }) => {
  return (
    <section className={styles.column}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{title}</h2>
        <button type="button">
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0v24M0 12h24" stroke="#222" stroke-width="4" />
          </svg>
        </button>
      </header>
    </section>
  );
};
