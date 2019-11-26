import React from 'react';
import gravatarUrl from 'gravatar-url';
import styles from './kanban-card.module.css';

export const KanbanCard = ({ cardId, title, content, authorEmail }) => {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <img
          width="24"
          height="24"
          alt={`${authorEmail} Avatar`}
          src={gravatarUrl(authorEmail, { size: 24 })}
        />
        <h3 className={styles.heading}>{title}</h3>
      </header>
      <p className={styles.content}>{content}</p>
    </article>
  );
};
