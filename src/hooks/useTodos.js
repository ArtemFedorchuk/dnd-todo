import { useSelector } from 'react-redux';

export const useTodos = () => {
  const { count, isLoading, todos, tasks } = useSelector((state) => state.todos);

  return {
    count,
    isLoading,
    todos,
    tasks,
  };
};
