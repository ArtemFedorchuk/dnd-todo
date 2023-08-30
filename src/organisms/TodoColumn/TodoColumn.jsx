import { Droppable } from '@hello-pangea/dnd';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

import { TodoItem } from '../../atoms';

export const TodoColumn = ({ col: { list, id }, onRemove }) => (
  <Droppable droppableId={id}>
    {(provided) => (
      <div className={styles.column}>
        <h2>
          {id} {list.length > 0 && `: ${list.length}`}
        </h2>

        <div className={styles.styledList} {...provided.droppableProps} ref={provided.innerRef}>
          {list.map((text, index) => (
            <TodoItem key={text} onRemove={onRemove} text={text} index={index} columnName={id} />
          ))}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
);

TodoColumn.propTypes = {
  col: PropTypes.object,
  onRemove: PropTypes.func,
};
