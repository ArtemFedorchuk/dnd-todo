import PropTypes from 'prop-types';
import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import styles from './style.module.scss';

export const TodoItem = ({ task }) => {
  return (
    <Draggable draggableId={task.title.toString()} index={task.id - 1}>
      {(provided) => (
        <div
          className={styles.todoItem}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <b className={styles.todoItemId}>{task.id}</b>
          <p>{task.title}</p>
        </div>
      )}
    </Draggable>
  );
};

TodoItem.propTypes = {
  task: PropTypes.object,
};
