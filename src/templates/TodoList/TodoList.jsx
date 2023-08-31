import { DragDropContext } from '@hello-pangea/dnd';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

import { MyModal } from '../../atoms';
import { useActions, useTodos } from '../../hooks';
import { TodoColumn } from '../../organisms';

export const TodoList = () => {
  const { columns, isLoading } = useTodos();
  const {
    fetchAllTasks,
    updateColumnTasks,
    updateMultiColumnTasks,
    removeTaskById,
    removeTasksByColumnId,
  } = useActions();

  const [open, setOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

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
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Make a new end list array
      const newEndList = [...end.list];

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // disable moving items from 2 and 3 columns to 1 column
      if ((start.id === 'in-progress' || start.id === 'done') && end.id === 'todo') {
        return null;
      }
      // Update the store
      updateMultiColumnTasks({
        startColId: start.id,
        endColId: end.id,
        startTasks: newStartList,
        endTasks: newEndList,
      });
    }
  };

  const handleConfirmRemoveTaskById = () => {
    removeTaskById(taskToDelete);
  };

  const handleRemoveTaskById = ({ columnId, taskId }) => {
    setOpen(true);
    setTaskToDelete({ columnId, taskId });
  };

  const handleRemoveTasksByColumnId = (columnId) => {
    removeTasksByColumnId(columnId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.listWrapper}>
        {isLoading && <h2>Loading...</h2>}

        <div className={styles.columnsWrapper}>
          {Object.values(columns).map((col) => (
            <TodoColumn
              col={col}
              key={col.id}
              onRemove={handleRemoveTaskById}
              onRemoveTasks={handleRemoveTasksByColumnId}
            />
          ))}
        </div>
      </div>

      <MyModal
        open={open}
        title="Remove task"
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmRemoveTaskById}
      >
        <p>Do you really want to remove this task?</p>
      </MyModal>
    </DragDropContext>
  );
};
