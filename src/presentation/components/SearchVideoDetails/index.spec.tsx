import userEvent from '@testing-library/user-event';
import { mockVideo } from '@/presentation/test/mock-video';
import { render, screen } from '@/utils/test';
import { SearchVideoDetails } from '.';

describe('Presentation: Components/SearchVideoDetails', () => {
  it('should render the search video details passed by props', () => {
    const video = mockVideo();
    render(<SearchVideoDetails video={video} />);
    const { channelTitle, publishedAt, title } = video;

    const titleComponent = screen.getByText(title);
    const channelTitleComponent = screen.getByText(channelTitle);
    const thumbnailComponent = screen.getByRole('img', {
      name: `thumbnail do vídeo ${title}`
    });
    const publishedAtComponent = screen.getByText(publishedAt);
    expect(titleComponent).toBeInTheDocument();
    expect(channelTitleComponent).toBeInTheDocument();
    expect(thumbnailComponent).toBeInTheDocument();
    expect(publishedAtComponent).toBeInTheDocument();
  });

  it('should call the onAdd callback with the correct params', async () => {
    const user = userEvent.setup();
    const video = mockVideo();
    const handler = jest.fn();
    render(<SearchVideoDetails video={video} onAdd={handler} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(handler).toHaveBeenCalledWith(video);
  });
});
