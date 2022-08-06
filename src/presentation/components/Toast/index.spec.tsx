import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/test';
import { Toast, ToastProps } from '.';

describe('Presentation: Components/Toast', () => {
  const defaultProps: ToastProps = {
    text: faker.lorem.words()
  };

  it('should render the text passed by text prop', () => {
    render(<Toast {...defaultProps} />);
    const text = screen.getByText(defaultProps.text);
    expect(text).toBeInTheDocument();
  });

  it('should render the success state when type prop is "success"', () => {
    render(<Toast {...defaultProps} type="success" />);
    const successState = screen.getByText('🥳');
    expect(successState).toBeInTheDocument();
  });

  it('should render the error state when type prop is "error"', () => {
    render(<Toast {...defaultProps} type="error" />);
    const errorState = screen.getByText('😥');
    expect(errorState).toBeInTheDocument();
  });

  it('should render the warning state when type prop is "warning"', () => {
    render(<Toast {...defaultProps} type="warning" />);
    const warningState = screen.getByText('🧐');
    expect(warningState).toBeInTheDocument();
  });

  it('should not render the close button if closeToastCallback is not defined', () => {
    render(<Toast {...defaultProps} />);
    const closeButton = screen.queryByRole('button', { name: /fechar/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('should call the closeToast callback on close button press', async () => {
    const user = userEvent.setup();
    const handler = jest.fn();
    render(<Toast {...defaultProps} closeToast={handler} />);
    const closeButton = screen.getByRole('button', { name: /fechar/i });
    await user.click(closeButton);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
