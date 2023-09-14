import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { MyButton } from './MyButton';

const handleClick = jest.fn();

describe('MyButton', () => {
  it('render button', () => {
    const { queryByText } = render(<MyButton text="My Button" onClick={handleClick} />);
    expect(queryByText(/my button/i)).toBeInTheDocument();
  });

  it('button click', () => {
    const { getByText } = render(<MyButton text="My Button" onClick={handleClick} />);
    fireEvent.click(getByText(/my button/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('button snapshot', () => {
    const button = render(<MyButton text="My Button" onClick={handleClick} />);
    expect(button).toMatchSnapshot();
  });
});
