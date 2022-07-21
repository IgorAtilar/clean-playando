import { SearchVideos } from '@/domain/usecases/search-videos';
import { RemoteSearchVideo } from '@/data/usecases/remote-search-videos/remote-search-video';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { GlobalStateAdapter, useGlobalState } from '@/infra/cache/global-state-adapter';

export function makeSearchVideos(): SearchVideos {
  const { searchCacheState, addToSearchCacheState } = useGlobalState();

  return new RemoteSearchVideo(
    makeApiUrl('search'),
    makeAxiosHttpClient(),
    new GlobalStateAdapter({ searchCacheState, addToSearchCacheState })
  );
}
