import { RemoveVideo } from '@/domain/usecases/remove-video';
import { LocalRemoveVideo } from '@/data/usecases/local-remove-video/local-remove-video';
import { GlobalStateAdapter, useGlobalState } from '@/infra/cache/global-state-adapter';

export function makeRemoveVideo(): RemoveVideo {
  const { removeFromPlaylistState } = useGlobalState();
  return new LocalRemoveVideo(new GlobalStateAdapter({ removeFromPlaylistState }));
}
