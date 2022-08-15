import { SearchVideos } from '@/domain/usecases/search-videos';
import { RemoteSearchVideos } from '@/data/usecases/remote-search-videos/remote-search-videos';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { useAddToSearchCache, useGetSearchCache } from '@/infra/state/adapters';

export function makeSearchVideos(): SearchVideos {
  const { addToSearchCache } = useAddToSearchCache();
  const { getSearchCache } = useGetSearchCache();

  return new RemoteSearchVideos(
    makeApiUrl('search'),
    makeAxiosHttpClient(),
    getSearchCache,
    addToSearchCache
  );
}
