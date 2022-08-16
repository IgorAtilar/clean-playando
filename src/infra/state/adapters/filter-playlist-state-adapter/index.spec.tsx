import { act } from 'react-dom/test-utils';
import { faker } from '@faker-js/faker';
import { AllTheProviders, configureTestStore, renderHook } from '@/utils/test';
import { filterPlaylist } from '@/infra/state/redux/slices/playlist';
import { useFilterPlaylist } from '.';

describe('Infra: State/Adapters/useFilterPlaylist', () => {
  it('should dispatch the filterPlaylist action with the correct params', () => {
    const pattern = faker.datatype.string();

    const store = configureTestStore();

    const wrapper = ({ children }) => <AllTheProviders store={store}>{children}</AllTheProviders>;
    const { result: renderResult } = renderHook(() => useFilterPlaylist(), { wrapper });
    const {
      current: { filterPlaylist: filterPlaylistHook }
    } = renderResult;

    act(() => {
      filterPlaylistHook(pattern);
    });
    expect(store.dispatch).toHaveBeenCalledWith(filterPlaylist({ pattern }));
  });
});
