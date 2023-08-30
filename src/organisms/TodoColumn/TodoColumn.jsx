import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import styles from './styles.module.scss';

import { TodoItem } from '../../atoms';

export const TodoColumn = ({ column }) => {
  return (
    <div className={styles.columnWrapper}>
      <div className={styles.column}>
        <h3 className={styles.columnTitle}>
          {column.title}
          {column.tasks.length > 0 && <span>: {column.tasks.length}</span>}
        </h3>
        {column.tasks.map((task) => (
          <Fragment key={task.id}>
            <TodoItem task={task} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

TodoColumn.propTypes = {
  column: PropTypes.object,
};
