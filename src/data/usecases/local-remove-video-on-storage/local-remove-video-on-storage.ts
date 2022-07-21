import { Video } from '@/domain/models/video-model';
import { RemoveVideoOnStorage } from '@/domain/usecases/remove-video-on-storage';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { PLAYLIST_PERSISTENT_STORAGE_KEY } from '@/services/persistent-storage';

export class LocalRemoveVideoOnStorage implements RemoveVideoOnStorage {
  constructor(private readonly persistentStorage: PersistentStorageAdapter<Video>) {}

  remove(id: string): void {
    const playlist = this.persistentStorage.get(PLAYLIST_PERSISTENT_STORAGE_KEY);
    if (!playlist.find((value) => value.id === id)) return;
    const newPlaylist = playlist.filter((video) => video.id !== id);
    this.persistentStorage.set(PLAYLIST_PERSISTENT_STORAGE_KEY, newPlaylist);
  }
}
