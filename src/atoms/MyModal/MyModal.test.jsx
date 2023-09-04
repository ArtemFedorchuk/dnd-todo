import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { MyModal } from './MyModal';

describe('Modal component', () => {
  it('List modals', () => {
    render(
      <MyModal open={true} title="Modal title">
        Some content
      </MyModal>,
    );

    expect(screen.queryByText('Some content')).toBeInTheDocument();
  });

  it('Modal snapshot', () => {
    const modalElem = render(
      <MyModal open={false} title="Modal title">
        Some content
      </MyModal>,
    );

    expect(modalElem).toMatchSnapshot();
  });
});
