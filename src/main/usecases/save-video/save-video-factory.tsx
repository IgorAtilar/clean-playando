import { LocalSaveVideo } from '@/data/usecases/local-save-video/local-save-video';
import { SaveVideo } from '@/domain/usecases/save-video';
import { GlobalStateAdapter, useGlobalState } from '@/infra/cache/global-state-adapter';

export function makeSaveVideo(): SaveVideo {
  const { addToGlobalState } = useGlobalState();
  return new LocalSaveVideo(new GlobalStateAdapter({ addToGlobalState }));
}
