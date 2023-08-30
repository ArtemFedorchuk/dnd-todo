import React, { Fragment, useEffect } from 'react';

import { useActions, useTodos } from '../../hooks';
import { TodoColumn } from '../../organisms';

export const TodoList = () => {
  const { count, columns, isLoading } = useTodos();
  const { decrement, increment, fetchAllTasks } = useActions();

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  return (
    <>
      <div style={{ display: 'none', height: 20 }}>
        <button onClick={() => decrement()}>-</button>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => fetchAllTasks()}>fetch</button>
        <h1>Count: {count}</h1>
      </div>

      {isLoading && <h1>Loading...</h1>}

      {!isLoading &&
        columns.map((column) => (
          <Fragment key={column.id}>
            <TodoColumn column={column} />
          </Fragment>
        ))}
    </>
  );
};
