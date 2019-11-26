import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  BoardStateContext,
  BoardStateChangeContext,
} from '../../context/BoardProvider';
import styles from './board.module.css';
import { KanbanColumn } from './KanbanColumn';

function dragLocationChanged(source, destination) {
  return (
    source.droppableId !== destination.droppableId ||
    source.index !== destination.index
  );
}

export function Board() {
  const state = React.useContext(BoardStateContext);
  const { moveCard } = React.useContext(BoardStateChangeContext);

  const handleDragEnd = result => {
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    if (!dragLocationChanged(source, destination)) {
      return;
    }

    moveCard({
      source: source,
      destination: destination,
      cardId: draggableId,
    });
  };

  const colIds = Object.keys(state.columns);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className={styles.board}>
        {colIds.map(colId => {
          const column = state.columns[colId];
          return (
            <KanbanColumn
              key={column.id}
              colId={column.id}
              title={column.title}
              cardIds={column.cardIds}
              cards={state.cards}
            />
          );
        })}
      </main>
    </DragDropContext>
  );
}
