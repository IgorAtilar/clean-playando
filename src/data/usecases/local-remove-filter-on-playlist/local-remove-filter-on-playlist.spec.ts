import { LocalRemoveFilterOnPlaylist } from './local-remove-filter-on-playlist';

describe('Data: LocalRemoveFilterOnPlaylist', () => {
  it('should call removeFilterOnPlaylistOnGlobalState callback when remove method is called', () => {
    const removeFilterOnPlaylistOnGlobalState = jest.fn();
    const localRemoveFilterOnPlaylist = new LocalRemoveFilterOnPlaylist(
      removeFilterOnPlaylistOnGlobalState
    );
    localRemoveFilterOnPlaylist.remove();
    expect(removeFilterOnPlaylistOnGlobalState).toHaveBeenCalledTimes(1);
  });
});
