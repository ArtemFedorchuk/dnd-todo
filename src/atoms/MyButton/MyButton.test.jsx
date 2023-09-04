import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { MyButton } from './MyButton';

const handleClick = jest.fn();

describe('Button component', () => {
  it('List renders', () => {
    render(<MyButton text="My Button" onClick={handleClick} />);
    expect(screen.queryByText(/my button/i)).toBeInTheDocument();
  });

  it('Button click', () => {
    render(<MyButton text="My Button" onClick={handleClick} />);
    fireEvent.click(screen.getByText(/my button/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Button snapshot', () => {
    const button = render(<MyButton text="My Button" onClick={handleClick} />);
    expect(button).toMatchSnapshot();
  });
});
