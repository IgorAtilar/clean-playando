import { SaveVideo } from '@/domain/usecases/save-video';
import { LocalSaveVideo } from '@/data/usecases/local-save-video/local-save-video';
import { GlobalStateAdapter, useGlobalState } from '@/infra/cache/global-state-adapter';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { LocalSaveVideoStorage } from '@/data/usecases/local-save-video-on-storage/local-save-video-on-storage';

export function makeSaveVideo(): SaveVideo {
  const { addToPlaylistState } = useGlobalState();
  return new LocalSaveVideo(
    new GlobalStateAdapter({ addToPlaylistState }),
    new LocalSaveVideoStorage(new PersistentStorageAdapter())
  );
}
