import { LocalPlaylist } from './local-playlist';

describe('Data: LocalPlalist', () => {
  it('should call getPlaylistFromGlobalState callback when get method is called', () => {
    const getPlaylistFromGlobalState = jest.fn();
    const localPlaylist = new LocalPlaylist(getPlaylistFromGlobalState);
    localPlaylist.get();
    expect(getPlaylistFromGlobalState).toHaveBeenCalledTimes(1);
  });
});
