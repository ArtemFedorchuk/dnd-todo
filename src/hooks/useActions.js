import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { actions, fetchAllTasks } from '../redux/reducers/ToDoReducer';

const rootActions = { ...actions };

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators({ ...rootActions, fetchAllTasks }, dispatch);
  }, [dispatch]);
};
