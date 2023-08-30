import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import styles from './styles.module.scss';

import { TodoItem } from '../../atoms';

export const TodoColumn = ({ column }) => {
  return (
    <div className={styles.columnWrapper}>
      <h2>
        {column.title}
        {column.tasks.length > 0 && <span>: {column.tasks.length}</span>}
      </h2>

      <div className={styles.column}>
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
