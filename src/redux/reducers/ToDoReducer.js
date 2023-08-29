import { createReducer } from '@reduxjs/toolkit';

import { decrement, increment } from '../actions';

const columns = [
  {
    id: 1,
    title: 'ToDo',
  },
  {
    id: 2,
    title: 'In Progress',
  },
  {
    id: 3,
    title: 'Ready for QA',
  },
];

const initialState = {
  count: 0,
  isLoading: false,
  todos: columns,
  tasks: [],
};

export const toDoReducer = createReducer(initialState, {
  [increment]: (state) => {
    state.count += 1;
  },
  [decrement]: (state) => {
    state.count -= 1;
  },
});
