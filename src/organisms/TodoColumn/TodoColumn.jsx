import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import styles from './styles.module.scss';

import { TodoItem } from '../../atoms';

export const TodoColumn = ({ title, tasks }) => {
  return (
    <div className={styles.columnWrapper}>
      <h2>{title}</h2>
      <div className={styles.column}>
        {tasks.map(({ id, ...rest }) => (
          <Fragment key={id}>
            <TodoItem {...rest} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

TodoColumn.propTypes = {
  title: PropTypes.string,
  tasks: PropTypes.array,
};
