import { Video } from '@/domain/models/video-model';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { PlaylistStorage } from '@/domain/usecases/playlist-storage';
import { PLAYLIST_PERSISTENT_STORAGE_KEY } from '@/services/persistent-storage';

export class LocalPlaylistOnStorage implements PlaylistStorage {
  constructor(private readonly persistentStorage: PersistentStorageAdapter<Video>) {}

  get(): Video[] {
    return this.persistentStorage.get(PLAYLIST_PERSISTENT_STORAGE_KEY);
  }
}
