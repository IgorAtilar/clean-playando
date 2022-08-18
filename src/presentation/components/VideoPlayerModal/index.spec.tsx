import userEvent from '@testing-library/user-event';
import YouTubePlayer from 'react-player/youtube';
import { act, render, screen } from '@/utils/test';
import { VideoPlayerModal, VideoPlayerProps } from '.';

jest.mock(
  'react-player/youtube',
  () =>
    function () {
      return <div>mock-youtube-player</div>;
    }
);

describe('Presentation: Components/VideoPlayerModal', () => {
  const defaultProps: VideoPlayerProps = {
    videoId: 'Hp3V7HYTbhQ',
    onClose: () => {},
    isOpen: true
  };

  it('should render the initial state correctly', () => {
    render(<VideoPlayerModal {...defaultProps} />);
    const pauseButton = screen.getByRole('button', { name: 'pausar' });
    const progressInput = screen.getByRole('slider', { name: 'duração' });
    const volumeInput = screen.getByRole('slider', { name: 'volume' });
    expect(progressInput).toHaveValue('0');
    expect(pauseButton).toBeInTheDocument();
    expect(volumeInput).toHaveValue('1');
  });

  it('should render the play button when the pause button is pressed', async () => {
    const user = userEvent.setup();
    render(<VideoPlayerModal {...defaultProps} />);
    const pauseButton = screen.getByRole('button', { name: 'pausar' });
    await act(async () => {
      await user.click(pauseButton);
    });
    const playButton = screen.getByRole('button', { name: 'reproduzir' });
    expect(playButton).toBeInTheDocument();
  });

  it('should render the pause button when the play button is pressed', async () => {
    const user = userEvent.setup();
    render(<VideoPlayerModal {...defaultProps} />);
    const pauseButton = screen.getByRole('button', { name: 'pausar' });
    await act(async () => {
      await user.click(pauseButton);
    });
    const playButton = screen.getByRole('button', { name: 'reproduzir' });
    await act(async () => {
      await user.click(playButton);
    });

    expect(pauseButton).toBeInTheDocument();
  });
});
