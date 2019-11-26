import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar } from '../Avatar';
import styles from './kanban-card.module.css';

export const KanbanCard = React.memo(
  ({ cardId, index, title, content, authorEmail }) => {
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
              <Avatar email={authorEmail} />
              <h3 className={styles.heading}>{title}</h3>
            </header>
            <p className={styles.content}>{content}</p>
          </article>
        )}
      </Draggable>
    );
  },
  arePropsEqual,
);

function arePropsEqual(prevProps, nextProps) {
  console.log({ prevProps, nextProps });
  return (
    prevProps.cardId === nextProps.cardId &&
    prevProps.index === nextProps.index &&
    prevProps.title === nextProps.title &&
    prevProps.context === nextProps.content &&
    prevProps.authorEmail === nextProps.authorEmail
  );
}
