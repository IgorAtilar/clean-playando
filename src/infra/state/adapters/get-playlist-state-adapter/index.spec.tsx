import { act } from 'react-dom/test-utils';
import { AllTheProviders, configureTestStore, renderHook } from '@/utils/test';
import { mockVideos } from '@/presentation/test/mock-video';
import { useGetPlaylist } from '.';

describe('Infra: State/Adapters/useGetPlaylist', () => {
  it('should return the playlist on store when getPlaylist is called', () => {
    const videos = mockVideos();
    const store = configureTestStore({
      playlist: {
        videos,
        filteredVideos: videos
      },
      searchCache: {
        searchs: {}
      }
    });

    const wrapper = ({ children }) => <AllTheProviders store={store}>{children}</AllTheProviders>;
    const { result: renderResult } = renderHook(() => useGetPlaylist(), { wrapper });
    const {
      current: { getPlaylist }
    } = renderResult;

    act(() => {
      const response = getPlaylist();
      expect(response).toStrictEqual(videos);
    });
  });
});
