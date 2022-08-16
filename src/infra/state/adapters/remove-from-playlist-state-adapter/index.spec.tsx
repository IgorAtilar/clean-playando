import { act } from 'react-dom/test-utils';
import { faker } from '@faker-js/faker';
import { AllTheProviders, configureTestStore, renderHook } from '@/utils/test';
import { removeFromPlaylist } from '@/infra/state/redux/slices/playlist';
import { useRemoveFromPlaylist } from '.';

describe('Infra: State/Adapters/useRemoveFromPlaylist', () => {
  it('should dispatch the removeFromPlaylist action with the correct params', () => {
    const store = configureTestStore();
    const id = faker.datatype.uuid();
    const wrapper = ({ children }) => <AllTheProviders store={store}>{children}</AllTheProviders>;
    const { result: renderResult } = renderHook(() => useRemoveFromPlaylist(), { wrapper });
    const {
      current: { removeFromPlaylist: removeFromPlaylistHook }
    } = renderResult;

    act(() => {
      removeFromPlaylistHook(id);
    });
    expect(store.dispatch).toHaveBeenCalledWith(removeFromPlaylist({ id }));
  });
});
