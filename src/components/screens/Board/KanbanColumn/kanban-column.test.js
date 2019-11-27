import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { act, render, fireEvent, waitForElement } from '@testing-library/react';
import { KanbanColumn } from './KanbanColumn';
import {
  BoardProvider,
  BoardStateChangeContext,
  BoardStateContext,
  initialState,
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

const originalLog = console.log;
afterEach(() => (console.log = originalLog));

test('Adding a card does not rerender other cards', async () => {
  let consoleOutput = [];
  const mockedLog = output =>
    typeof output === 'string' && consoleOutput.push(output);

  console.log = mockedLog;

  const { getByText, getByLabelText, container } = render(
    <BoardProvider>
      <BoardStateContext.Consumer>
        {state => (
          <BoardStateChangeContext.Consumer>
            {({ addCard }) => (
              <DragDropContext onDragEnd={jest.fn()}>
                <KanbanColumn
                  colId="1"
                  title="In progress"
                  cardIds={state.columns['1'].cardIds}
                  cards={state.cards}
                  addCard={addCard}
                />
                <KanbanColumn
                  colId="2"
                  title="In progress"
                  cardIds={state.columns['2'].cardIds}
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

  const openFormButton = container.querySelectorAll(
    '[data-testid="open-card-form-button"]',
  )[1];

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

  consoleOutput = [];

  const submitButton = getByText(/save task/i);

  fireEvent.click(submitButton);

  await waitForElement(() => getByText(/foo/i));

  const col1CardIds = initialState.columns['1'].cardIds.map(
    id => `KanbanCard #${id}`,
  );

  // go through each console output after we clicked submit
  // and compare it to the card ids in col 1. We expect that no card id
  // in col 1 appears in the console output, verifying those components
  // did not rerender.
  consoleOutput.forEach(out => {
    col1CardIds.forEach(id => {
      expect(out.includes(id)).toBe(false);
    });
  });
});
