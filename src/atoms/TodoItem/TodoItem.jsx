import { Draggable } from '@hello-pangea/dnd';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './style.module.scss';

import { MyButton } from '../../atoms';

export const TodoItem = ({ text, index, columnName, onRemove }) => {
  const draggableId = React.useId();

  const showRemoveBtn = columnName === 'in-progress' || columnName === 'done';

  return (
    <Draggable draggableId={draggableId + index.toString()} index={index} key={index}>
      {(provided) => (
        <div
          className={styles.todoItem}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}

          {showRemoveBtn && (
            <div className={styles.removeBtnWrapper}>
              <MyButton
                variant="error"
                text="Remove"
                onClick={() => onRemove({ columnId: columnName, task: text })}
              />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  columnName: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
