import { SearchVideos } from '@/domain/usecases/search-videos';
import { RemoteSearchVideo } from '@/data/usecases/remote-search-videos/remote-search-video';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';

export function makeSearchVideos(): SearchVideos {
  return new RemoteSearchVideo(makeApiUrl('search'), makeAxiosHttpClient());
}
