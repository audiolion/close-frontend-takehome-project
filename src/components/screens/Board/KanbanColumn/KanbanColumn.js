import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { KanbanCard } from './KanbanCard';
import { KanbanColumnHeader } from './KanbanColumnHeader';
import styles from './kanban-column.module.css';

export const KanbanColumn = React.memo(({ colId, title, cardIds, cards }) => {
  return (
    <section className={styles.column}>
      <KanbanColumnHeader title={title} />

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
