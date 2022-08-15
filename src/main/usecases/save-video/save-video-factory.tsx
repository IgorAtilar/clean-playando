import { SaveVideo } from '@/domain/usecases/save-video';
import { LocalSaveVideo } from '@/data/usecases/local-save-video/local-save-video';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { LocalSaveVideoOnStorage } from '@/data/usecases/local-save-video-on-storage/local-save-video-on-storage';
import { useAddToPlaylist } from '@/infra/state/adapters';

export function makeSaveVideo(): SaveVideo {
  const { addToPlaylist } = useAddToPlaylist();
  return new LocalSaveVideo(
    addToPlaylist,
    new LocalSaveVideoOnStorage(new PersistentStorageAdapter())
  );
}
