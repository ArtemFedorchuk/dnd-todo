import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { toDoReducer } from '../reducers/ToDoReducer';

const rootReducer = combineReducers({
  todos: toDoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
