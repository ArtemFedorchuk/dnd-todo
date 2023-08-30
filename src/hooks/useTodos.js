import { useSelector } from 'react-redux';

export const useTodos = () => {
  const { count, isLoading, todos, tasks, columns } = useSelector((state) => state.todos);

  return {
    count,
    isLoading,
    todos,
    tasks,
    columns,
  };
};
