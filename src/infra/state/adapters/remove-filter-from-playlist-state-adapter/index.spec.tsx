import { act } from 'react-dom/test-utils';
import { AllTheProviders, configureTestStore, renderHook } from '@/utils/test';
import { removeFilterFromPlaylist } from '@/infra/state/redux/slices/playlist';
import { useRemoveFilterFromPlaylist } from '.';

describe('Infra: State/Adapters/useRemoveFilterFromPlaylist', () => {
  it('should dispatch the removeFilterFromPlaylist', () => {
    const store = configureTestStore();

    const wrapper = ({ children }) => <AllTheProviders store={store}>{children}</AllTheProviders>;
    const { result: renderResult } = renderHook(() => useRemoveFilterFromPlaylist(), { wrapper });
    const {
      current: { removeFilterOnPlaylist: removeFilterOnPlaylistHook }
    } = renderResult;

    act(() => {
      removeFilterOnPlaylistHook();
    });
    expect(store.dispatch).toHaveBeenCalledWith(removeFilterFromPlaylist());
  });
});
