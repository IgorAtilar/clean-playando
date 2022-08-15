import { RemoveVideo } from '@/domain/usecases/remove-video';
import { LocalRemoveVideo } from '@/data/usecases/local-remove-video/local-remove-video';
import { LocalRemoveVideoOnStorage } from '@/data/usecases/local-remove-video-on-storage/local-remove-video-on-storage';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { useRemoveFromPlaylist } from '@/infra/state/adapters';

export function makeRemoveVideo(): RemoveVideo {
  const { removeFromPlaylist } = useRemoveFromPlaylist();
  return new LocalRemoveVideo(
    removeFromPlaylist,
    new LocalRemoveVideoOnStorage(new PersistentStorageAdapter())
  );
}
