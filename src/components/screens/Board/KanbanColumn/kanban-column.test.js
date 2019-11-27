import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { act, render, fireEvent, waitForElement } from '@testing-library/react';
import { KanbanColumn } from './KanbanColumn';
import {
  BoardProvider,
  BoardStateChangeContext,
  BoardStateContext,
} from '../../../context/BoardProvider';

test('Clicking plus button opens form', () => {
  const { queryByLabelText, getByTestId } = render(
    <DragDropContext onDragEnd={jest.fn()}>
      <KanbanColumn
        colId="1"
        title="To do"
        cardIds={[]}
        cards={{}}
        addCard={jest.fn()}
      />
    </DragDropContext>,
  );

  expect(queryByLabelText(/email/i)).toBeNull();

  const openFormButton = getByTestId('open-card-form-button');

  fireEvent.click(openFormButton);

  expect(queryByLabelText(/email/i)).toBeInTheDocument();
});

test('Clicking cancel button closes form', () => {
  const { getByText, queryByLabelText, getByTestId } = render(
    <DragDropContext onDragEnd={jest.fn()}>
      <KanbanColumn
        colId="1"
        title="To do"
        cardIds={[]}
        cards={{}}
        addCard={jest.fn()}
      />
    </DragDropContext>,
  );

  const openFormButton = getByTestId('open-card-form-button');

  fireEvent.click(openFormButton);

  const cancelButton = getByText(/cancel/i);

  expect(queryByLabelText(/email/i)).toBeInTheDocument();

  fireEvent.click(cancelButton);

  expect(queryByLabelText(/email/i)).toBeNull();
});

test('Filling out form and submitting adds a card to the column', async () => {
  const { getByText, getByLabelText, getByTestId } = render(
    <BoardProvider>
      <BoardStateContext.Consumer>
        {state => (
          <BoardStateChangeContext.Consumer>
            {({ addCard }) => (
              <DragDropContext onDragEnd={jest.fn()}>
                <KanbanColumn
                  colId="1"
                  title="To do"
                  cardIds={state.columns['1'].cardIds}
                  cards={state.cards}
                  addCard={addCard}
                />
              </DragDropContext>
            )}
          </BoardStateChangeContext.Consumer>
        )}
      </BoardStateContext.Consumer>
    </BoardProvider>,
  );

  const openFormButton = getByTestId('open-card-form-button');

  fireEvent.click(openFormButton);

  fireEvent.change(getByLabelText(/title/i), {
    target: { value: 'foo' },
  });

  fireEvent.change(getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });

  fireEvent.change(getByLabelText(/description/i), {
    target: { value: 'bar' },
  });

  const submitButton = getByText(/save task/i);

  fireEvent.click(submitButton);

  await waitForElement(() => getByText(/foo/i));
});
