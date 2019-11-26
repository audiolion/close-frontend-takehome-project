import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { KanbanCard } from '../KanbanCard';
import styles from './kanban-column.module.css';

export const KanbanColumn = React.memo(({ colId, title, cardIds, cards }) => {
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
            <path d="M12 0v24M0 12h24" stroke="#222" strokeWidth="4" />
          </svg>
        </button>
      </header>

      <Droppable droppableId={`${colId}`}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.cardList}
          >
            <KanbanCardList cardIds={cardIds} cards={cards} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
});

const KanbanCardList = React.memo(function KanbanCardList({ cards, cardIds }) {
  return cardIds.map((cardId, index) => {
    const card = cards[cardId];
    return (
      <KanbanCard
        key={card.id}
        cardId={card.id}
        title={card.title}
        authorEmail={card.authorEmail}
        content={card.content}
        index={index}
      />
    );
  });
});
