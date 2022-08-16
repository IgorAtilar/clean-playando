import { act } from 'react-dom/test-utils';
import { faker } from '@faker-js/faker';
import { AllTheProviders, configureTestStore, renderHook } from '@/utils/test';
import { addToSearchCache } from '@/infra/state/redux/slices/search-cache';
import { mockVideos } from '@/presentation/test/mock-video';
import { useAddToSearchCache } from '.';

describe('Infra: State/Adapters/useAddToSearchCache', () => {
  it('should dispatch the addToSearchCache action with the correct params', () => {
    const result = mockVideos();
    const search = faker.datatype.string();

    const store = configureTestStore();

    const wrapper = ({ children }) => <AllTheProviders store={store}>{children}</AllTheProviders>;
    const { result: renderResult } = renderHook(() => useAddToSearchCache(), { wrapper });
    const {
      current: { addToSearchCache: addToSearchCacheHook }
    } = renderResult;

    act(() => {
      addToSearchCacheHook(search, result);
    });
    expect(store.dispatch).toHaveBeenCalledWith(addToSearchCache({ search, result }));
  });
});
