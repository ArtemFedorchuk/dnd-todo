import { Droppable } from '@hello-pangea/dnd';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

import { MyButton, TodoItem } from '../../atoms';

export const TodoColumn = ({ col: { list, id }, onRemove, onRemoveTasks }) => {
  const showRemoveBtn = list.length > 0 && id === 'done';

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className={styles.column}>
          <h2>
            {id} {list.length > 0 && `: ${list.length}`}
          </h2>

          <div className={styles.styledList} {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((task, index) => (
              <TodoItem
                key={task.id}
                onRemove={onRemove}
                task={task}
                index={index}
                columnName={id}
              />
            ))}

            {showRemoveBtn && (
              <MyButton variant="error" text="Remove all tasks" onClick={() => onRemoveTasks(id)} />
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

TodoColumn.propTypes = {
  col: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRemoveTasks: PropTypes.func.isRequired,
};
