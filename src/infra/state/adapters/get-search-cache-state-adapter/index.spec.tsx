import { act } from 'react-dom/test-utils';
import { faker } from '@faker-js/faker';
import { AllTheProviders, configureTestStore, renderHook } from '@/utils/test';
import { mockVideos } from '@/presentation/test/mock-video';
import { useGetSearchCache } from '.';

describe('Infra: State/Adapters/useGetSearchCache', () => {
  it('should return the search cache for a search term on store when getSearchCache is called', () => {
    const videos = mockVideos();
    const search = faker.datatype.string();
    const store = configureTestStore({
      playlist: {
        videos: [],
        filteredVideos: []
      },
      searchCache: {
        searchs: {
          [search]: videos
        }
      }
    });

    const wrapper = ({ children }) => <AllTheProviders store={store}>{children}</AllTheProviders>;
    const { result: renderResult } = renderHook(() => useGetSearchCache(), { wrapper });
    const {
      current: { getSearchCache }
    } = renderResult;

    act(() => {
      const response = getSearchCache(search);
      expect(response).toStrictEqual(videos);
    });
  });

  it('should return an empty array if does not have a search result saved on store', () => {
    const search = faker.datatype.string();
    const store = configureTestStore({
      playlist: {
        videos: [],
        filteredVideos: []
      },
      searchCache: {
        searchs: {}
      }
    });

    const wrapper = ({ children }) => <AllTheProviders store={store}>{children}</AllTheProviders>;
    const { result: renderResult } = renderHook(() => useGetSearchCache(), { wrapper });
    const {
      current: { getSearchCache }
    } = renderResult;

    act(() => {
      const response = getSearchCache(search);
      expect(response).toStrictEqual([]);
    });
  });
});
