import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { KanbanCard } from './KanbanCard';
import { KanbanColumnHeader } from './KanbanColumnHeader';
import { KanbanCardForm } from './KanbanCardForm';
import styles from './kanban-column.module.css';

export const KanbanColumn = React.memo(
  ({ colId, title, cardIds, cards, addCard }) => {
    const [isCardFormOpen, setIsCardFormOpen] = React.useState(false);

    const openCardForm = () => setIsCardFormOpen(true);
    const closeCardForm = () => setIsCardFormOpen(false);

    const handleSave = values => {
      const { title, email, description } = values;
      addCard({
        colId,
        title,
        email,
        description,
      });
    };

    return (
      <section className={styles.column}>
        <KanbanColumnHeader title={title} onOpenCardForm={openCardForm} />

        <div className={styles.cardList}>
          {isCardFormOpen && (
            <KanbanCardForm onSave={handleSave} onCancel={closeCardForm} />
          )}

          <Droppable droppableId={`${colId}`}>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <KanbanCardList cardIds={cardIds} cards={cards} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </section>
    );
  },
);

const KanbanCardList = React.memo(function KanbanCardList({ cards, cardIds }) {
  return cardIds.map((cardId, index) => {
    const card = cards[cardId];
    return (
      <KanbanCard
        key={card.id}
        cardId={card.id}
        title={card.title}
        authorEmail={card.authorEmail}
        description={card.description}
        index={index}
      />
    );
  });
});
