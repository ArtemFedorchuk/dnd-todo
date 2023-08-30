import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducer as toDoReducer } from '../reducers/ToDoReducer';

const rootReducer = combineReducers({
  todos: toDoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
