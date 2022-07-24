import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';
import { LocalRemoveFilterOnPlaylist } from './local-remove-filter-on-playlist';

jest.mock('@/infra/cache/global-state-adapter');

describe('Data: LocalRemoveFilterOnPlaylist', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call GlobalStateAdapter removeFilterOnPlaylist method when remove method is called', () => {
    const globalState = new GlobalStateAdapter();
    const localRemoveFilterOnPlaylist = new LocalRemoveFilterOnPlaylist(globalState);
    localRemoveFilterOnPlaylist.remove();
    expect(globalState.removeFilterOnPlaylist).toHaveBeenCalledTimes(1);
  });
});
