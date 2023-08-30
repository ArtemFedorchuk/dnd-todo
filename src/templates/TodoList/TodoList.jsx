import React, { Fragment, useEffect, useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import { useActions, useTodos } from '../../hooks';
import { TodoColumn } from '../../organisms';

export const TodoList = () => {
  const { columns: storedColumns, isLoading } = useTodos();
  const { fetchAllTasks, updateColumnTasks, updateMultiColumnTasks } = useActions();

  const [columns, setColumns] = useState([]);

  console.log(storedColumns);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  useEffect(() => {
    setColumns(storedColumns);
  }, [fetchAllTasks, storedColumns]);

  const onDragEnd = ({ source, destination, draggableId }) => {
    // Make sure we have a valid destination
    if (!destination) {
      return null;
    }

    // Make sure we're actually moving the item
    if (source.droppableId === destination.droppableId && destination.index === source.index) {
      return null;
    }

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.tasks.filter((task) => task.title !== draggableId);
      // Then insert the item at the right location

      newList.splice(destination.index - 1, 0, start.tasks[source.index]);

      updateColumnTasks({ columnId: start.id, newList });
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.tasks.filter((task) => task.title !== draggableId);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        title: start.title,
        tasks: newStartList,
      };

      // Make a new end list array
      const newEndList = end.tasks;

      // Insert the item into the end list
      newEndList.splice(destination.index - 1, 0, start.tasks[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        title: end.title,
        tasks: newEndList,
      };

      updateMultiColumnTasks({
        startColId: start.id,
        endColId: end.id,
        startTasks: newStartList,
        endTasks: newEndList,
      });
      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isLoading && <h1>Loading...</h1>}

      {!isLoading &&
        storedColumns.map((column) => (
          <Fragment key={column.id}>
            <TodoColumn column={column} />
          </Fragment>
        ))}
    </DragDropContext>
  );
};
