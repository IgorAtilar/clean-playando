import { Video } from '@/domain/models/video-model';
import { SaveVideoOnStorage } from '@/domain/usecases/save-video-on-storage';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { PLAYLIST_PERSISTENT_STORAGE_KEY } from '@/services/persistent-storage';

export class LocalSaveVideoStorage implements SaveVideoOnStorage {
  constructor(private readonly persistentStorage: PersistentStorageAdapter<Video>) {}

  save(video: Video): void {
    const playlist = this.persistentStorage.get(PLAYLIST_PERSISTENT_STORAGE_KEY);
    if (playlist.find((value) => value.id === video.id)) return;

    const newPlaylist = [...playlist, video];

    this.persistentStorage.set(PLAYLIST_PERSISTENT_STORAGE_KEY, newPlaylist);
  }
}
