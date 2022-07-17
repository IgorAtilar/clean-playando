import { render, screen } from '@/utils/test';
import { Modal } from '.';

describe('Presentation: Components/Modal', () => {
  it('should be visible if isOpen prop is true', () => {
    render(<Modal isOpen />);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('should not be visible if isOpen prop is false', () => {
    render(<Modal isOpen={false} />);
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('should render the children component correctly', () => {
    const componentText = 'modal-content';
    render(
      <Modal isOpen>
        <h1>{componentText}</h1>
      </Modal>
    );
    const component = screen.getByText(componentText);
    expect(component).toBeInTheDocument();
  });
});
