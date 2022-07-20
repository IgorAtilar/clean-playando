import { RemoteSearchVideoByUrl } from '@/data/usecases/remote-search-video-by-url/remote-search-video-by-url';
import { SearchVideoByUrl } from '@/domain/usecases/search-video-by-url';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';

export function makeSearchVideoByUrl(): SearchVideoByUrl {
  return new RemoteSearchVideoByUrl(makeApiUrl('videos'), makeAxiosHttpClient());
}
