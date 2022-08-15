import { faker } from '@faker-js/faker';
import { LocalFilterPlaylist } from './local-filter-playlist';

describe('Data: LocalFilterPlaylist', () => {
  it('should call filterPlaylistOnGlobalState callback with the correct pattern', () => {
    const pattern = faker.lorem.word();
    const filterPlaylistOnGlobalState = jest.fn();
    const localFilterPlaylist = new LocalFilterPlaylist(filterPlaylistOnGlobalState);
    localFilterPlaylist.filter(pattern);
    expect(filterPlaylistOnGlobalState).toHaveBeenCalledWith(pattern);
  });
});
