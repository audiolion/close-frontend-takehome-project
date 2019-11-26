import React from 'react';
import gravatarUrl from 'gravatar-url';
import { Draggable } from 'react-beautiful-dnd';
import styles from './kanban-card.module.css';

export const KanbanCard = ({ cardId, index, title, content, authorEmail }) => {
  return (
    <Draggable draggableId={`${cardId}`} index={index}>
      {provided => (
        <article
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.card}
          ref={provided.innerRef}
        >
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
      )}
    </Draggable>
  );
};
