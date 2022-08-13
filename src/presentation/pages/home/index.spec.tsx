import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { faker } from '@faker-js/faker';
import { render, screen } from '@/utils/test';
import { SearchVideos } from '@/domain/usecases/search-videos';
import { SaveVideo } from '@/domain/usecases/save-video';
import { Playlist } from '@/domain/usecases/playlist';
import { RemoveVideo } from '@/domain/usecases/remove-video';
import { FilterPlaylist } from '@/domain/usecases/filter-playlist';
import { RemoveFilterOnPlaylist } from '@/domain/usecases/remove-filter-of-playlist';
import { SearchVideoByUrl } from '@/domain/usecases/search-video-by-url';
import { HomeProps, Home } from '.';
import { mockVideo, mockVideos } from '@/presentation/test/mock-video';
import { useToast } from '@/presentation/contexts/ToastContext';

jest.mock('@/presentation/contexts/ToastContext', () => ({
  useToast: () => ({ showToast: jest.fn() })
}));

const filterPlaylist: FilterPlaylist = {
  filter: () => {}
};

const playlist: Playlist = {
  get: jest.fn().mockImplementation(() => [])
};

const removeFilterOnPlaylist: RemoveFilterOnPlaylist = {
  remove: () => {}
};

const removeVideo: RemoveVideo = {
  remove: () => {}
};

const saveVideo: SaveVideo = {
  save: () => undefined
};

const searchVideoByUrl: SearchVideoByUrl = {
  search: () => undefined
};

const searchVideos: SearchVideos = {
  search: () => undefined
};

const youtubeUrl = 'https://www.youtube.com/watch?v=tw7HYXK2104&t=1555s';

describe('Presentation: Pages/Home', () => {
  const defaultProps: HomeProps = {
    filterPlaylist,
    playlist,
    removeFilterOnPlaylist,
    removeVideo,
    saveVideo,
    searchVideoByUrl,
    searchVideos
  };

  it('should render the videos received from the playlist prop on the get method', () => {
    const mockedVideos = mockVideos();
    const mockedPlaylist: Playlist = {
      get: jest.fn().mockImplementationOnce(() => mockedVideos)
    };
    render(<Home {...defaultProps} playlist={mockedPlaylist} />);

    mockedVideos.forEach((mockVideo) => {
      const videoContent = screen.getByText(mockVideo.title);
      expect(videoContent).toBeInTheDocument();
    });
  });

  it('should not call the search method from searchVideoByUrl or searchVideo prop if the search input is empty', async () => {
    const user = userEvent.setup();
    const mockedSearchVideoByUrl: SearchVideoByUrl = {
      search: jest.fn()
    };
    const mockedSearchVideos: SearchVideos = {
      search: jest.fn()
    };
    render(<Home {...defaultProps} searchVideoByUrl={mockedSearchVideoByUrl} />);
    const button = screen.getByRole('button', { name: /buscar/i });
    await user.click(button);
    expect(mockedSearchVideoByUrl.search).not.toHaveBeenCalled();
    expect(mockedSearchVideos.search).not.toHaveBeenCalled();
  });

  it('should call the search method from searchVideoByUrl prop with the correct value when adding video by youtube url', async () => {
    const user = userEvent.setup();
    const mockedSearchVideoByUrl: SearchVideoByUrl = {
      search: jest.fn().mockImplementationOnce(() => ({
        video: mockVideo()
      }))
    };

    const mockedSaveVideo: SaveVideo = {
      save: jest.fn().mockImplementationOnce(() => ({
        success: 'success-test'
      }))
    };
    render(
      <Home
        {...defaultProps}
        searchVideoByUrl={mockedSearchVideoByUrl}
        saveVideo={mockedSaveVideo}
      />
    );

    await act(async () => {
      const input = screen.getByPlaceholderText(/insira o link ou título do vídeo/i);
      await user.type(input, youtubeUrl);
      const button = screen.getByRole('button', { name: /adicionar/i });
      await user.click(button);
    });

    expect(mockedSearchVideoByUrl.search).toHaveBeenCalledWith(youtubeUrl);
  });

  it('should call the search method from searchVideos prop with the correct values when searching for videos by title', async () => {
    const user = userEvent.setup();
    const mockedSearchVideos: SearchVideos = {
      search: jest.fn().mockImplementationOnce(() => ({
        videos: []
      }))
    };

    render(<Home {...defaultProps} searchVideos={mockedSearchVideos} />);
    const text = faker.word.verb();

    await act(async () => {
      const input = screen.getByPlaceholderText(/insira o link ou título do vídeo/i);
      await user.type(input, text);
      const button = screen.getByRole('button', { name: /buscar/i });
      await user.click(button);
    });

    expect(mockedSearchVideos.search).toHaveBeenCalledWith({ maxResults: 4, query: text });
  });

  it('should call the save method from saveVideo prop with the correct value when click on "Adicionar" inside the results modal', async () => {
    const user = userEvent.setup();
    const mockedVideos = mockVideos();
    const mockedSearchVideos: SearchVideos = {
      search: jest.fn().mockImplementationOnce(() => ({
        videos: mockedVideos
      }))
    };

    const mockedSaveVideo: SaveVideo = {
      save: jest.fn().mockImplementationOnce(() => ({
        success: 'success'
      }))
    };

    render(
      <Home {...defaultProps} searchVideos={mockedSearchVideos} saveVideo={mockedSaveVideo} />
    );
    const text = faker.word.verb();

    await act(async () => {
      const input = screen.getByPlaceholderText(/insira o link ou título do vídeo/i);
      await user.type(input, text);
      const button = screen.getByRole('button', { name: /buscar/i });
      await user.click(button);
    });

    const addButton = screen.getAllByRole('button', { name: /adicionar/i })[0];

    await act(async () => {
      await user.click(addButton);
    });

    expect(mockedSaveVideo.save).toHaveBeenCalledWith(mockedVideos[0]);
  });

  it('should call the save method from saveVideo prop with the correct value when typing a youtube url and click on "Adicionar"', async () => {
    const user = userEvent.setup();
    const mockedVideo = mockVideo();
    const mockedSearchVideoByUrl: SearchVideoByUrl = {
      search: jest.fn().mockImplementationOnce(() => ({
        video: mockedVideo
      }))
    };

    const mockedSaveVideo: SaveVideo = {
      save: jest.fn().mockImplementationOnce(() => ({
        success: 'success'
      }))
    };

    render(
      <Home
        {...defaultProps}
        searchVideoByUrl={mockedSearchVideoByUrl}
        saveVideo={mockedSaveVideo}
      />
    );

    await act(async () => {
      const input = screen.getByPlaceholderText(/insira o link ou título do vídeo/i);
      await user.type(input, youtubeUrl);
      const button = screen.getByRole('button', { name: /adicionar/i });
      await user.click(button);
    });

    expect(mockedSaveVideo.save).toHaveBeenCalledWith(mockedVideo);
  });

  it('should call the remove method from removeVideo prop with the correct id when click to remove a video from playlist', async () => {
    const user = userEvent.setup();
    const mockedVideo = mockVideo();

    const mockedRemoveVideo: RemoveVideo = {
      remove: jest.fn()
    };

    const mockedPlaylist: Playlist = {
      get: jest.fn().mockImplementationOnce(() => [mockedVideo])
    };
    render(<Home {...defaultProps} playlist={mockedPlaylist} removeVideo={mockedRemoveVideo} />);
    const removeButton = screen.getByTitle(/excluir da playlist/i);
    await user.click(removeButton);

    expect(mockedRemoveVideo.remove).toHaveBeenCalledWith(mockedVideo.id);
  });

  it('should call the filter method from filterPlaylist prop with the correct value when trying to filter the playlist', async () => {
    const user = userEvent.setup();
    const mockedFilterPlaylist: FilterPlaylist = {
      filter: jest.fn()
    };
    render(<Home {...defaultProps} filterPlaylist={mockedFilterPlaylist} />);
    const input = screen.getByPlaceholderText(/palavras-chave/i);
    const text = faker.word.verb();

    await user.type(input, text);

    const filterButton = screen.getByRole('button', { name: /filtrar/i });

    await user.click(filterButton);

    expect(mockedFilterPlaylist.filter).toHaveBeenCalledWith(text);
  });

  it('should call the remove method from removeFilterOnPlaylist prop when clicking to remove filter on playlist', async () => {
    const user = userEvent.setup();

    const mockedRemoveFilterOnPlaylist: RemoveFilterOnPlaylist = {
      remove: jest.fn()
    };

    render(<Home {...defaultProps} removeFilterOnPlaylist={mockedRemoveFilterOnPlaylist} />);
    const input = screen.getByPlaceholderText(/palavras-chave/i);
    const text = faker.word.verb();

    await user.type(input, text);

    const filterButton = screen.getByRole('button', { name: /filtrar/i });

    await user.click(filterButton);

    const clearButton = screen.getByRole('button', { name: /limpar filtro/i });

    await user.click(clearButton);

    expect(mockedRemoveFilterOnPlaylist.remove).toHaveBeenCalledTimes(1);
  });
});
