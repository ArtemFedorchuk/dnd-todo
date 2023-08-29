import PropTypes from 'prop-types';
import React from 'react';

import styles from './style.module.scss';

export const TodoItem = ({ title }) => {
  return <div className={styles.todoItem}>{title}</div>;
};

TodoItem.propTypes = {
  title: PropTypes.string,
};
