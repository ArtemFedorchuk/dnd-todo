import React from 'react';

import styles from './style.module.scss';

import { TodoList } from '../../templates/TodoList/TodoList';

export const MainPage = () => {
  return (
    <div className={styles.mainPageContainer}>
      <TodoList />
    </div>
  );
};
