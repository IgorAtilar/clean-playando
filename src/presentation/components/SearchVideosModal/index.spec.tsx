import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/test';
import { SearchVideosModal, SearchVideosModalProps } from '.';
import { mockVideos } from '@/presentation/test/mock-video';

describe('Presentation: Components/SearchVideosModal', () => {
  const defaultProps: SearchVideosModalProps = {
    isOpen: true
  };
  it('should call the onClose callback when close button is pressed', async () => {
    const user = userEvent.setup();
    const handler = jest.fn();
    render(<SearchVideosModal {...defaultProps} onClose={handler} />);
    const button = screen.getByRole('button', { name: /fechar/i });
    await user.click(button);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should render the loading state if results prop is undefined or empty', () => {
    render(<SearchVideosModal {...defaultProps} videos={[]} />);
    const loading = screen.getByText(/carregando.../i);
    expect(loading).toBeInTheDocument();
  });

  it('should render the error if errorMessage prop is passed', () => {
    const errorMessageText = 'Um erro ocorreu :C Tente novamente!';
    render(<SearchVideosModal {...defaultProps} errorMessage={errorMessageText} />);
    const loading = screen.queryByText(/carregando.../i);
    expect(loading).not.toBeInTheDocument();
    const errorMessage = screen.getByText(errorMessageText);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render the results if results prop is defined', () => {
    const errorMessageText = 'Um erro ocorreu :C Tente novamente!';
    const videosMock = mockVideos();
    render(<SearchVideosModal {...defaultProps} videos={videosMock} />);
    const loading = screen.queryByText(/carregando.../i);
    const errorMessage = screen.queryByText(errorMessageText);
    const result = screen.getByText(videosMock[0].title);
    expect(loading).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(result).toBeInTheDocument();
  });
});
