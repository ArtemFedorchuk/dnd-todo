import { DragDropContext } from '@hello-pangea/dnd';
import React, { useEffect } from 'react';

import styles from './styles.module.scss';

import { useActions, useTodos } from '../../hooks';
import { TodoColumn } from '../../organisms';

export const TodoList = () => {
  const { columns, isLoading } = useTodos();
  const { fetchAllTasks, updateColumnTasks, updateMultiColumnTasks, removeTaskByName } =
    useActions();

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) {
      return null;
    }

    if (source.droppableId === destination.droppableId && destination.index === source.index) {
      return null;
    }

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Update the store
      updateColumnTasks({ columnId: start.id, newList });
      return null;
    } else {
      try {
        // If start is different from end, we need to update multiple columns
        // Filter the start list like before
        const newStartList = start.list.filter((_, idx) => idx !== source.index);

        // Make a new end list array
        const newEndList = [...end.list];

        // Insert the item into the end list
        newEndList.splice(destination.index, 0, start.list[source.index]);

        // Update the store
        updateMultiColumnTasks({
          startColId: start.id,
          endColId: end.id,
          startTasks: newStartList,
          endTasks: newEndList,
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  };

  const handleRemoveTask = ({ columnId, task }) => {
    removeTaskByName({ columnId, task });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {isLoading && <h1>Loading...</h1>}

      <div className={styles.styledColumns}>
        {Object.values(columns).map((col) => (
          <TodoColumn col={col} key={col.id} onRemove={handleRemoveTask} />
        ))}
      </div>
    </DragDropContext>
  );
};
