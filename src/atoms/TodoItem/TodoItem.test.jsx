import { fireEvent, render } from '@testing-library/react';

import { TodoItem } from './TodoItem';

import { MyButton } from '../MyButton/MyButton';

const handleRemove = jest.fn();

const mockedTask = {
  userId: 1,
  id: 1,
  title: 'Some title',
  completed: false,
};

describe('TodoItem component', () => {
  const component = (
    <TodoItem index={1} columnName="in-progress" onRemove={handleRemove} task={mockedTask} />
  );
  const removeBtn = <MyButton text="Remove" onClick={handleRemove} />;

  it('should render todo item', () => {
    const { getByText } = render(component);
    expect(getByText(/some title/i)).toBeInTheDocument();
  });

  it('should click remove', () => {
    const { getByText } = render(removeBtn);
    fireEvent.click(getByText(/remove/i));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('todo item snapshot', () => {
    const todo = render(component);
    expect(todo).toMatchSnapshot();
  });
});
