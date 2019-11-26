import React from 'react';
import { BoardStateContext } from '../../../context/BoardProvider';
import { KanbanCard } from '../KanbanCard';
import styles from './kanban-column.module.css';

export const KanbanColumn = ({ colId, title }) => {
  const state = React.useContext(BoardStateContext);
  const cardIds = state.columns[colId].cardIds;

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

      <div className={styles.content}>
        {cardIds.map(cardId => {
          const card = state.cards[cardId];
          return (
            <KanbanCard
              key={card.id}
              cardId={card.id}
              title={card.title}
              authorEmail={card.authorEmail}
              content={card.content}
            />
          );
        })}
      </div>
    </section>
  );
};
