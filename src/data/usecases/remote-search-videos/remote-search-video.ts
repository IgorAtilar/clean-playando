import { HttpGetClient } from '@/data/protocols/http/http-get-client';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { Video, VideoResponse } from '@/domain/models/video-model';
import {
  SearchVideos,
  SearchVideosParams,
  SearchVideosResponse
} from '@/domain/usecases/search-videos';
import { getFormattedDateString } from '@/utils/date';

export type GetSearchVideosResponse = {
  items: VideoResponse[];
};

export class RemoteSearchVideo implements SearchVideos {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SearchVideosParams, GetSearchVideosResponse>
  ) {}

  async search(params: SearchVideosParams): Promise<SearchVideosResponse> {
    const { statusCode, data } = await this.httpGetClient.get({
      url: this.url,
      params
    });

    if (statusCode !== 200) {
      const error = new UnexpectedError();
      return {
        errorMessage: error.message,
        videos: []
      };
    }

    if (!data?.items) return { videos: [] };

    const videos: Video[] = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnails: item.snippet.thumbnails,
      publishedAt: getFormattedDateString(item.snippet.publishedAt)
    }));

    return { videos };
  }
}
