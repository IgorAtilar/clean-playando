import { faker } from '@faker-js/faker';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';
import { LocalFilterPlaylist } from './local-filter-playlist';

jest.mock('@/infra/cache/global-state-adapter');

describe('Data: LocalFilterPlaylist', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call GlobalStateAdapter filterPlaylist method with the correct pattern', () => {
    const pattern = faker.lorem.word();
    const globalState = new GlobalStateAdapter();
    const localFilterPlaylist = new LocalFilterPlaylist(globalState);
    localFilterPlaylist.filter(pattern);
    expect(globalState.filterPlaylist).toHaveBeenCalledWith(pattern);
  });
});
