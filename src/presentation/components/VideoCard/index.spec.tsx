import { render, screen } from '@/utils/test';
import { mockVideo } from '@/presentation/test/mock-video';
import { VideoCardProps, VideoCard } from '.';

// TODO: Fix tests
describe.skip('Presentation: Components/Player', () => {
  const defaultProps: VideoCardProps = {
    position: '1',
    video: mockVideo(),
    onRemove: () => {},
    onPlay: () => {}
  };

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
});
