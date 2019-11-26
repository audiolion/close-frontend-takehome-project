import React from 'react';
import styles from './kanban-column.module.css';
import { KanbanCard } from '../KanbanCard';

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

      <KanbanCard
        authorEmail="lukas@close.io"
        title="Technical Call 2"
        content="Have a call with Close's Engineering Manager and Frontend Tech Lead."
      />

      <KanbanCard
        authorEmail="mary@close.io"
        title="Culture Call"
        content="Get to know Mary Hartberg, Close's queen of culture!"
      />
      <KanbanCard
        authorEmail="phil@close.io"
        title="General Call 3"
        content="Time to talk to Phil Freo, the Director of Engineering at Close :D"
      />
      <KanbanCard
        authorEmail="steli@close.io"
        title="Chat with Founder"
        content="Getting so Close (pun intended)"
      />
    </section>
  );
};
