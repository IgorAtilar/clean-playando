import { HttpGetClient } from '@/data/protocols/http/http-get-client';
import { NotFoundError } from '@/domain/errors/not-found-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { Video, VideoResponse } from '@/domain/models/video-model';
import {
  SearchVideos,
  SearchVideosParams,
  SearchVideosResponse
} from '@/domain/usecases/search-videos';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';
import { getFormattedDateString } from '@/utils/date';

export type GetSearchVideosResponse = {
  items: VideoResponse[];
};

export type RawSearchVideoParams = Omit<SearchVideosParams, 'query'> & {
  q: string;
};

export class RemoteSearchVideos implements SearchVideos {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RawSearchVideoParams, GetSearchVideosResponse>,
    private readonly globalState: GlobalStateAdapter
  ) {}

  async search(params: SearchVideosParams): Promise<SearchVideosResponse> {
    const search = params.query;

    const searchCachedVideos = this.globalState.getSearchCacheOnGlobalState(search);

    if (searchCachedVideos.length) return { videos: searchCachedVideos };

    const { statusCode, data } = await this.httpGetClient.get({
      url: this.url,
      params: {
        maxResults: params?.maxResults,
        q: params.query
      }
    });

    if (statusCode !== 200) {
      const error = new UnexpectedError();
      return {
        errorMessage: error.message
      };
    }

    if (!data?.items || data?.items.length === 0) {
      const error = new NotFoundError();
      return {
        errorMessage: error.message
      };
    }

    const videos: Video[] = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      publishedAt: getFormattedDateString(item.snippet.publishedAt)
    }));

    this.globalState.addToSearchCache(search, videos);

    return { videos };
  }
}
