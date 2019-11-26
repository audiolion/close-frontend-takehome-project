import React from 'react';
import createPersistedState from 'use-persisted-state';
import { BOARD_CACHE_KEY } from '../../utils';

export const BoardStateContext = React.createContext();
export const BoardStateChangeContext = React.createContext();

const initialState = {
  columns: {
    1: {
      id: 1,
      title: 'To do',
      cardIds: [1, 2, 3, 4],
    },
    2: {
      id: 2,
      title: 'In progress',
      cardIds: [5],
    },
    3: {
      id: 3,
      title: 'Done',
      cardIds: [6, 7],
    },
  },
  cards: {
    1: {
      id: 1,
      authorEmail: 'lukas@close.io',
      title: 'Technical Call 2',
      content:
        "Have a call with Close's Engineering Manager and Frontend Tech Lead.",
    },
    2: {
      id: 2,
      authorEmail: 'mary@close.io',
      title: 'Culture Call',
      content: "Get to know Mary Hartberg, Close's queen of culture!",
    },
    3: {
      id: 3,
      authorEmail: 'phil@close.io',
      title: 'General Call 3',
      content:
        'Time to talk to Phil Freo, the Director of Engineering at Close :D',
    },
    4: {
      id: 4,
      authorEmail: 'steli@close.io',
      title: 'Chat with Founder',
      content: 'Getting so Close (pun intended)',
    },
    5: {
      id: 5,
      authorEmail: 'vitor@close.io',
      title: 'Take-Home Project',
      content: 'Create a simple Kanban Board to show your skills.',
    },
    6: {
      id: 6,
      authorEmail: 'bart@close.io',
      title: 'Technical Call 1',
      content: 'Talk to one of the Frontend Engineers currently in the team.',
    },
    7: {
      id: 7,
      authorEmail: 'vitor@close.io',
      title: 'Screening',
      content:
        "Fill out Close's application form, so they can get to know me :)",
    },
  },
};

const useBoardState = createPersistedState(BOARD_CACHE_KEY);

const useBoard = initialState => {
  const [state, setState] = useBoardState(initialState);

  const moveCard = ({ source, destination, cardId }) => {
    const sourceColumn = state.columns[source.droppableId];
    const destinationColumn = state.columns[destination.droppableId];

    const sourceCardIds = [...sourceColumn.cardIds];
    sourceCardIds.splice(source.index, 1);

    if (sourceColumn.id === destinationColumn.id) {
      sourceCardIds.splice(destination.index, 0, cardId);
    }

    const newSourceColumn = {
      ...sourceColumn,
      cardIds: sourceCardIds,
    };

    let newDestinationColumn;
    if (sourceColumn.id !== destinationColumn.id) {
      const destinationCardIds = [...destinationColumn.cardIds];
      destinationCardIds.splice(destination.index, 0, cardId);

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

  return {
    state,
    moveCard,
  };
};
export const BoardProvider = props => {
  let savedState;
  try {
    savedState = localStorage.getItem(BOARD_CACHE_KEY);
  } catch {}

  const { state, moveCard } = useBoard(savedState || initialState);

  const stateChangeContext = React.useMemo(
    () => ({
      moveCard,
    }),
    [moveCard],
  );
  return (
    <BoardStateContext.Provider value={state}>
      <BoardStateChangeContext.Provider value={stateChangeContext}>
        {props.children}
      </BoardStateChangeContext.Provider>
    </BoardStateContext.Provider>
  );
};
