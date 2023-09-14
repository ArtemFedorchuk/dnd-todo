import { fireEvent, render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { MyModal } from './MyModal';

describe('MyModal', () => {
  const handleConfirm = jest.fn();

  it('should render modal', () => {
    const { queryByText } = render(
      <MyModal open title="Modal title">
        Some content
      </MyModal>,
    );

    expect(queryByText(/some content/i)).toBeInTheDocument();
  });

  it('should click onConfirm', () => {
    const { getByText } = render(
      <MyModal open title="Modal title" onConfirm={handleConfirm}>
        Some content
      </MyModal>,
    );

    expect(getByText(/some content/i)).toBeTruthy();

    fireEvent.click(getByText(/confirm/i));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('modal snapshot', () => {
    const modalElem = render(
      <MyModal open={true} title="Modal title">
        Some content
      </MyModal>,
    );

    expect(modalElem).toMatchSnapshot();
  });
});
