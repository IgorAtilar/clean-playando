import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/test';
import { Toast, ToastProps } from '.';

describe('Presentation: Components/Toast', () => {
  const defaultProps: ToastProps = {
    closeToast: () => {},
    text: faker.lorem.words()
  };

  it('should be visible if isOpen prop is true', () => {
    render(<Toast isOpen {...defaultProps} />);
    const toast = screen.getByRole('dialog');
    expect(toast).toBeInTheDocument();
  });

  it('should not be visible if isOpen prop is true', () => {
    render(<Toast isOpen {...defaultProps} />);
    const toast = screen.getByRole('dialog');
    expect(toast).toBeInTheDocument();
  });

  it('should render the text passed by text prop', () => {
    render(<Toast isOpen {...defaultProps} />);
    const text = screen.getByText(defaultProps.text);
    expect(text).toBeInTheDocument();
  });

  it('should render the success state when type prop is "success"', () => {
    render(<Toast isOpen {...defaultProps} type="success" />);
    const successState = screen.getByText('🥳');
    expect(successState).toBeInTheDocument();
  });

  it('should render the error state when type prop is "error"', () => {
    render(<Toast isOpen {...defaultProps} type="error" />);
    const errorState = screen.getByText('😥');
    expect(errorState).toBeInTheDocument();
  });

  it('should call the closeToast callback on "Fechar" button press', async () => {
    const user = userEvent.setup();
    const handler = jest.fn();
    render(<Toast isOpen {...defaultProps} closeToast={handler} />);
    const closeButton = screen.getByRole('button', { name: /fechar/i });
    await user.click(closeButton);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should call the closeToast callback after autoCloseDelay time passed', () => {
    jest.useFakeTimers();
    const handler = jest.fn();
    const autoCloseDelay = 5000;
    render(<Toast isOpen {...defaultProps} closeToast={handler} autoCloseDelay={autoCloseDelay} />);
    expect(handler).not.toBeCalled();
    jest.advanceTimersByTime(autoCloseDelay);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
