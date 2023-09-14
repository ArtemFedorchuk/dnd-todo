import { Draggable } from '@hello-pangea/dnd';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './style.module.scss';

import { MyButton } from '../../atoms';

export const TodoItem = ({ task, index, columnName, onRemove }) => {
  const draggableId = React.useId();

  const showRemoveBtn = columnName === 'in-progress';

  return (
    <Draggable draggableId={draggableId + index.toString()} index={index} key={index}>
      {(provided) => (
        <div
          className={styles.todoItem}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.title}

          <div className={styles.taskFooter}>
            <b className={styles.taskId}>{task.id}</b>

            {showRemoveBtn && (
              <MyButton
                variant="error"
                text="Remove"
                onClick={() => onRemove({ columnId: columnName, taskId: task.id })}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

TodoItem.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  columnName: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};
