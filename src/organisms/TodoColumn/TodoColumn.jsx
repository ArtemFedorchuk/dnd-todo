import PropTypes from 'prop-types';
import React from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import styles from './styles.module.scss';

import { ColumnTitle, TodoItem } from '../../atoms';

export const TodoColumn = ({ column }) => {
  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={
            snapshot.isDraggingOver ? `${styles.column} ${styles.dragOver}` : styles.column
          }
        >
          <ColumnTitle column={column} />

          {column.tasks.map((task) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={task.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TodoItem task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

TodoColumn.propTypes = {
  column: PropTypes.object,
};
