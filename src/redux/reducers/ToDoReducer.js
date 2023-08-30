import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { client } from '../../Api';
import { removeStringFromArray } from '../../utils';

const initialColumns = {
  todo: {
    id: 'todo',
    list: [],
  },
  'in-progress': {
    id: 'in-progress',
    list: [],
  },
  done: {
    id: 'done',
    list: [],
  },
};

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
  const response = await client.get('todos');
  return response.data;
});

const initialState = {
  isLoading: false,
  columns: initialColumns,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateColumnTasks(state, action) {
      const columnId = action.payload.columnId;
      state.columns[columnId].list = action.payload.newList;
    },
    updateMultiColumnTasks(state, action) {
      const startColId = action.payload.startColId;
      const endColId = action.payload.endColId;

      state.columns[startColId].list = action.payload.startTasks;
      state.columns[endColId].list = action.payload.endTasks;
    },
    removeTaskByName(state, action) {
      const columnId = action.payload.columnId;
      const task = action.payload.task;

      removeStringFromArray(state.columns[columnId].list, task);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.columns['todo'].list = action.payload.map((task) => task.title);
      state.isLoading = false;
    });
  },
});

export const actions = todosSlice.actions;
export const { reducer } = todosSlice;
