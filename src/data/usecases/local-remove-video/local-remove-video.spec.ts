import { faker } from '@faker-js/faker';
import { Video } from '@/domain/models/video-model';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { LocalRemoveVideoOnStorage } from '@/data/usecases/local-remove-video-on-storage/local-remove-video-on-storage';
import { LocalRemoveVideo } from './local-remove-video';

jest.mock('@/infra/cache/global-state-adapter');
jest.mock('@/data/usecases/local-remove-video-on-storage/local-remove-video-on-storage');

describe('Data: LocalRemoveVideo', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call GlobalStateAdapter removeFromPlaylist method with the correct id and LocalRemoveVideoOnStorage remove method with the correct id when remove method is called', () => {
    const id = faker.datatype.uuid();
    const globalState = new GlobalStateAdapter();
    const persistentStorage = new PersistentStorageAdapter<Video>();
    const localRemoveVideoOnStorage = new LocalRemoveVideoOnStorage(persistentStorage);
    const localRemoveFilterOnPlaylist = new LocalRemoveVideo(
      globalState,
      localRemoveVideoOnStorage
    );
    localRemoveFilterOnPlaylist.remove(id);
    expect(globalState.removeFromPlaylist).toHaveBeenCalledWith(id);
    expect(localRemoveVideoOnStorage.remove).toHaveBeenCalledWith(id);
  });
});
