import { Video } from '@/domain/models/video-model';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { LocalPlaylistOnStorage } from './local-playlist-on-storage';

jest.mock('@/infra/cache/persistent-storage-adapter');

describe('Data: LocalPlaylistOnStorage', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call PersistentStorageAdapter get method when get method is called', () => {
    const persistentStorage = new PersistentStorageAdapter<Video>();
    const localPlaylistOnStorage = new LocalPlaylistOnStorage(persistentStorage);
    localPlaylistOnStorage.get();
    expect(persistentStorage.get).toHaveBeenCalledTimes(1);
  });
});
