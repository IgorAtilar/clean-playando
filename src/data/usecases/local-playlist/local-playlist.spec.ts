import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';
import { LocalPlaylist } from './local-playlist';

jest.mock('@/infra/cache/global-state-adapter');

describe('Data: LocalPlalist', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call GlobalStateAdapter getPlaylist method when get method is called', () => {
    const globalState = new GlobalStateAdapter();
    const localPlaylist = new LocalPlaylist(globalState);
    localPlaylist.get();
    expect(globalState.getPlaylist).toHaveBeenCalledTimes(1);
  });
});
