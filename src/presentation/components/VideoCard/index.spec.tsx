import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/test';
import { mockVideo } from '@/presentation/test/mock-video';
import { VideoCardProps, VideoCard } from '.';

describe('Presentation: Components/Player', () => {
  const defaultProps: VideoCardProps = {
    position: '1',
    video: mockVideo(),
    onRemove: () => {},
    onPlay: () => {}
  };

  it('should render the video thumbnail passed by video prop correctly', () => {
    render(<VideoCard {...defaultProps} />);
    const thumbnailComponent = screen.getByRole('img');
    expect(thumbnailComponent).toHaveAttribute('src', defaultProps.video.thumbnailUrl);
  });

  it('should render the position passed by position prop correctly', () => {
    render(<VideoCard {...defaultProps} />);
    const positionComponent = screen.getByText(`${defaultProps.position}.`);
    expect(positionComponent).toBeInTheDocument();
  });

  it('should render the video title passed by video prop correctly', () => {
    render(<VideoCard {...defaultProps} />);
    const titleComponent = screen.getByText(`${defaultProps.video.title}`);
    expect(titleComponent).toBeInTheDocument();
  });

  it('should render the video channelTitle passed by video prop correctly', () => {
    render(<VideoCard {...defaultProps} />);
    const channelTitleComponent = screen.getByText(`${defaultProps.video.channelTitle}`);
    expect(channelTitleComponent).toBeInTheDocument();
  });

  it('should render the video publishedAt passed by video prop correctly', () => {
    render(<VideoCard {...defaultProps} />);
    const publishedAtComponent = screen.getByText(`${defaultProps.video.publishedAt}`);
    expect(publishedAtComponent).toBeInTheDocument();
  });

  describe('actions', () => {
    it('should call the onRemove callback with the video id when the remove button is pressed', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      render(<VideoCard {...defaultProps} onRemove={handler} />);
      const removeButton = screen.getByRole('button', { name: 'ícone de excluir' });
      await user.click(removeButton);
      expect(handler).toHaveBeenCalledWith(defaultProps.video.id);
    });

    it('should call the onPlay callback with the video id when the remove button is pressed', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      render(<VideoCard {...defaultProps} onPlay={handler} />);
      const playButton = screen.getByRole('button', {
        name: `thumbnail do vídeo ${defaultProps.video.title}`
      });
      await user.click(playButton);
      expect(handler).toHaveBeenCalledWith(defaultProps.video.id);
    });
  });
});
