import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../redux/actions';

const rotActions = { ...actions };

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rotActions, dispatch);
  }, [dispatch]);
};
