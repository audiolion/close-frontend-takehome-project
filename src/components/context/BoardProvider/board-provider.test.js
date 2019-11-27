import { renderHook, act } from '@testing-library/react-hooks';
import { useBoard, initialState } from './BoardProvider';

jest.mock('shortid', () => ({
  generate: () => 'test',
}));

afterAll(() => jest.clearAllMocks());

test('useBoard can add a card', () => {
  const { result } = renderHook(() => useBoard(initialState));

  const newCard = {
    colId: 1,
    title: 'test',
    email: 'test@example.com',
    description: 'foo',
  };

  act(() => {
    result.current.addCard(newCard);
  });

  expect(result.current.state.cards['test']).toMatchObject({
    id: 'test',
    title: newCard.title,
    authorEmail: newCard.email,
    description: newCard.description,
  });
  expect(result.current.state.columns[1].cardIds).toContain('test');
});

test('useBoard can move a card within a column', () => {
  const { result } = renderHook(() => useBoard(initialState));

  act(() => {
    result.current.moveCard({
      source: {
        droppableId: '1',
        index: 0,
      },
      destination: {
        droppableId: '1',
        index: 1,
      },
      cardId: '2',
    });
  });

  expect(result.current.state.columns[1].cardIds[0]).toEqual('1');
  expect(result.current.state.columns[1].cardIds[1]).toEqual('2');
});

test('useBoard can move a card within a column', () => {
  const { result } = renderHook(() => useBoard(initialState));

  act(() => {
    result.current.moveCard({
      source: {
        droppableId: '1',
        index: 0,
      },
      destination: {
        droppableId: '1',
        index: 1,
      },
      cardId: '2',
    });
  });

  expect(result.current.state.columns[1].cardIds[1]).toEqual('2');
});
