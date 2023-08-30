import PropTypes from 'prop-types';
import React from 'react';

import styles from './style.module.scss';

export const TodoItem = ({ task }) => {
  return (
    <div className={styles.todoItem}>
      <b className={styles.todoItemId}>{task.id}</b>
      <p>{task.title}</p>
    </div>
  );
};

TodoItem.propTypes = {
  task: PropTypes.object,
};
