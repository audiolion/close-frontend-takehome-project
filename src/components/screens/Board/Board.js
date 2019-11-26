import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  BoardStateContext,
  BoardSetStateContext,
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
  const setState = React.useContext(BoardSetStateContext);

  const handleDragEnd = result => {
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    if (!dragLocationChanged(source, destination)) {
      return;
    }

    const sourceColumn = state.columns[source.droppableId];
    const destinationColumn = state.columns[destination.droppableId];

    const sourceCardIds = [...sourceColumn.cardIds];
    sourceCardIds.splice(source.index, 1);

    if (sourceColumn.id === destinationColumn.id) {
      sourceCardIds.splice(destination.index, 0, draggableId);
    }

    const newSourceColumn = {
      ...sourceColumn,
      cardIds: sourceCardIds,
    };

    let newDestinationColumn;
    if (sourceColumn.id !== destinationColumn.id) {
      const destinationCardIds = [...destinationColumn.cardIds];
      destinationCardIds.splice(destination.index, 0, draggableId);

      newDestinationColumn = {
        ...destinationColumn,
        cardIds: destinationCardIds,
      };
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        ...(newDestinationColumn
          ? { [newDestinationColumn.id]: newDestinationColumn }
          : {}),
      },
    };

    setState(newState);
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
