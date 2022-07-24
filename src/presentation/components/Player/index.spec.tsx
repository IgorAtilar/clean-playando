import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/test';
import { mockVideo } from '@/presentation/test/mock-video';
import { Player, PlayerProps, YOUTUBE_PLAYER_TEST_ID } from '.';

describe('Presentation: Components/Player', () => {
  const defaultProps: PlayerProps = {
    position: '1',
    video: mockVideo()
  };
  it('should render the youtube player if isPlaying prop is true', () => {
    render(<Player {...defaultProps} isPlaying />);
    const youtubePlayer = screen.getByTestId(YOUTUBE_PLAYER_TEST_ID);
    expect(youtubePlayer).toBeInTheDocument();
  });

  it('should render the video thumbnail if isPlaying prop is false', () => {
    render(<Player {...defaultProps} isPlaying={false} />);
    const image = screen.getByRole('img', {
      name: `thumbnail do vídeo ${defaultProps.video.title}`
    });

    expect(image).toBeInTheDocument();
  });

  it('should render the pause button if isPlaying prop is true', () => {
    render(<Player {...defaultProps} isPlaying />);
    const pauseButton = screen.getByRole('button', { name: 'ícone de pause' });
    expect(pauseButton).toBeInTheDocument();
  });

  it('should render the play button if isPlaying prop is false', () => {
    render(<Player {...defaultProps} isPlaying={false} />);
    const playButton = screen.getByRole('button', { name: 'ícone de play' });
    expect(playButton).toBeInTheDocument();
  });

  it('should render the position passed by position prop correctly', () => {
    render(<Player {...defaultProps} />);
    const positionComponent = screen.getByText(`${defaultProps.position}.`);
    expect(positionComponent).toBeInTheDocument();
  });

  it('should render the video title passed by video prop correctly', () => {
    render(<Player {...defaultProps} />);
    const titleComponent = screen.getByText(`${defaultProps.video.title}`);
    expect(titleComponent).toBeInTheDocument();
  });

  describe('actions', () => {
    it('should call togglePlay callback with the correct id when pause button is pressed', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      render(<Player {...defaultProps} isPlaying togglePlay={handler} />);
      const pauseButton = screen.getByRole('button', { name: 'ícone de pause' });
      await user.click(pauseButton);
      expect(handler).toHaveBeenCalledWith(defaultProps.video.id);
    });

    it('should call togglePlay callback with the correct id when play button is pressed', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      render(<Player {...defaultProps} isPlaying={false} togglePlay={handler} />);
      const playButton = screen.getByRole('button', { name: 'ícone de play' });
      await user.click(playButton);
      expect(handler).toHaveBeenCalledWith(defaultProps.video.id);
    });

    it('should call onRemove callback with the correct id when remove button is pressed', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      render(<Player {...defaultProps} isPlaying={false} onRemove={handler} />);
      const removeButton = screen.getByRole('button', { name: 'ícone de excluir' });
      await user.click(removeButton);
      expect(handler).toHaveBeenCalledWith(defaultProps.video.id);
    });
  });
});
