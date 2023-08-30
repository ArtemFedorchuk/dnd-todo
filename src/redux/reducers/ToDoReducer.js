import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { client } from '../../Api';

const initialColumns = [
  {
    id: 0,
    title: 'ToDo',
    tasks: [],
  },
  {
    id: 1,
    title: 'In Progress',
    tasks: [],
  },
  {
    id: 2,
    title: 'Ready for QA',
    tasks: [],
  },
];

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
  const response = await client.get('todos');
  return response.data;
});

const initialState = {
  isLoading: false,
  columns: initialColumns,
  tasks: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateColumnTasks(state, action) {
      const columnId = action.payload.columnId;
      state.columns[columnId].tasks = action.payload.newList;
    },
    updateMultiColumnTasks(state, action) {
      const startColId = action.payload.startColId;
      const endColId = action.payload.endColId;

      state.columns[startColId].tasks = action.payload.startTasks;
      state.columns[endColId].tasks = action.payload.endTasks;
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
