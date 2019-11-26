import React from 'react';

export const BoardStateContext = React.createContext();
export const BoardSetStateContext = React.createContext();

// function boardReducer(state, action) {
//   switch (action.type) {
//     case 'card/add': {
//       return state.map(col => {
//         if (col.title === action.payload.columnId) {
//           const card = {
//             authorEmail: action.payload.authorEmail,
//             title: action.payload.title,
//             content: action.payload.content,
//           };
//           col.cards.push(card);
//         }
//         return col;
//       });
//     }
//     case 'card/move': {
//       return state.map(col => {
//         if (col.title === action.payload.previousColumnId) {
//           return col.cards.filter(
//             card => card.authorEmail === action.payload.cardId,
//           );
//         }
//         if (col.title === action.payload.newColumnId) {
//           const card = {
//             authorEmail: action.payload.authorEmail,
//             title: action.payload.title,
//             content: action.payload.content,
//           };
//           return col.cards.push(card);
//         }
//         return col;
//       });
//     }
//     default: {
//       throw new Error(`Unsupported action type: ${action.type}`);
//     }
//   }
// }

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

export const BoardProvider = props => {
  const [state, setState] = React.useState(initialState);

  return (
    <BoardStateContext.Provider value={state}>
      <BoardSetStateContext.Provider value={setState}>
        {props.children}
      </BoardSetStateContext.Provider>
    </BoardStateContext.Provider>
  );
};
