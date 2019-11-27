import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar } from '../../Avatar';
import styles from './kanban-card.module.css';

export const KanbanCard = React.memo(function KanbanCard({
  cardId,
  index,
  title,
  description,
  authorEmail,
}) {
  if (process.env.NODE_ENV === 'test') {
    console.log(`KanbanCard #${cardId}, index: ${index} render`);
  }
  return (
    <Draggable draggableId={cardId} index={index}>
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
          <p className={styles.description}>{description}</p>
        </article>
      )}
    </Draggable>
  );
},
arePropsEqual);

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.cardId === nextProps.cardId &&
    prevProps.index === nextProps.index &&
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.authorEmail === nextProps.authorEmail
  );
}
