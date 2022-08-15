import { faker } from '@faker-js/faker';
import { Video } from '@/domain/models/video-model';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { LocalRemoveVideoOnStorage } from '@/data/usecases/local-remove-video-on-storage/local-remove-video-on-storage';
import { LocalRemoveVideo } from './local-remove-video';

jest.mock('@/data/usecases/local-remove-video-on-storage/local-remove-video-on-storage');

describe('Data: LocalRemoveVideo', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call removeFromPlaylistGlobalState callback with the correct id and LocalRemoveVideoOnStorage remove method with the correct id when remove method is called', () => {
    const id = faker.datatype.uuid();
    const removeFromPlaylistGlobalState = jest.fn();
    const persistentStorage = new PersistentStorageAdapter<Video>();
    const localRemoveVideoOnStorage = new LocalRemoveVideoOnStorage(persistentStorage);
    const localRemoveFilterOnPlaylist = new LocalRemoveVideo(
      removeFromPlaylistGlobalState,
      localRemoveVideoOnStorage
    );
    localRemoveFilterOnPlaylist.remove(id);
    expect(removeFromPlaylistGlobalState).toHaveBeenCalledWith(id);
    expect(localRemoveVideoOnStorage.remove).toHaveBeenCalledWith(id);
  });
});
