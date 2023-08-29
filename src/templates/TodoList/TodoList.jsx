import React, { Fragment, useEffect, useState } from 'react';

import { client } from '../../Api';
import { useActions, useTodos } from '../../hooks';
import { TodoColumn } from '../../organisms';

const tasks = [
  {
    id: 1,
    description: 'Task 1',
  },
  {
    id: 2,
    description: 'Task 2',
  },
  {
    id: 3,
    description: 'Task 3',
  },
];

const columns = [
  {
    id: 1,
    title: 'ToDo',
    tasks,
  },
  {
    id: 2,
    title: 'In Progress',
    tasks,
  },
  {
    id: 3,
    title: 'Ready for QA',
    tasks,
  },
];

export const TodoList = () => {
  const { count } = useTodos();
  const { decrement, increment } = useActions();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    client.get('todos').then((response) => setTasks(response.data));
  }, []);

  return (
    <>
      <div style={{ display: 'none' }}>
        <button onClick={() => decrement()}>-</button>
        <button onClick={() => increment()}>+</button>
        <h1>Count: {count}</h1>
      </div>
      {columns.map(({ id, title }) => (
        <Fragment key={id}>
          <TodoColumn title={title} tasks={tasks} />
        </Fragment>
      ))}
    </>
  );
};
