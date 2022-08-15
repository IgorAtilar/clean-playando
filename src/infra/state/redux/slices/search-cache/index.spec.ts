import { faker } from '@faker-js/faker';
import { mockVideos } from '@/presentation/test/mock-video';
import { searchCacheReducer, addToSearchCache, selectSearchCache, SearchCacheSliceState } from '.';

describe('Infra: State/Redux/SearchCacheSlice', () => {
  it('should return the correct initial state', () => {
    expect(searchCacheReducer(undefined, { type: undefined })).toEqual({
      searchs: {}
    });
  });

  it('should return the searchs correctly when selectSearchCache function is called', () => {
    const firstVideos = mockVideos();
    const secondVideos = mockVideos();
    const keyOne = faker.datatype.string();
    const keyTwo = faker.datatype.string();

    const state = {
      playlist: {
        videos: [],
        filteredVideos: []
      },
      searchCache: {
        searchs: {
          [keyOne]: firstVideos,
          [keyTwo]: secondVideos
        }
      }
    };
    expect(selectSearchCache(state)).toStrictEqual({
      [keyOne]: firstVideos,
      [keyTwo]: secondVideos
    });
  });

  it('should add a search results on search cache when addToSearchCache action is dispatched', () => {
    const searchOne = faker.datatype.string();
    const searchTwo = faker.datatype.string();
    const firstVideos = mockVideos();
    const secondVideos = mockVideos();

    expect(
      searchCacheReducer(undefined, addToSearchCache({ search: searchOne, result: firstVideos }))
    ).toEqual({
      searchs: {
        [searchOne]: firstVideos
      }
    });
    const previousState: SearchCacheSliceState = {
      searchs: { [searchOne]: firstVideos }
    };
    expect(
      searchCacheReducer(
        previousState,
        addToSearchCache({ search: searchTwo, result: secondVideos })
      )
    ).toEqual({
      searchs: {
        [searchOne]: firstVideos,
        [searchTwo]: secondVideos
      }
    });
  });
});
