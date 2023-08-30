import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { client } from '../../Api';

const initialColumns = [
  {
    id: 1,
    title: 'ToDo',
    tasks: [],
  },
  {
    id: 2,
    title: 'In Progress',
    tasks: [],
  },
  {
    id: 3,
    title: 'Ready for QA',
    tasks: [],
  },
];

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
  const response = await client.get('todos');
  return response.data;
});

const initialState = {
  count: 0,
  isLoading: false,
  columns: initialColumns,
  tasks: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.columns[0].tasks = action.payload;
      state.isLoading = false;
    });
  },
});

export const actions = todosSlice.actions;
export const { reducer } = todosSlice;
