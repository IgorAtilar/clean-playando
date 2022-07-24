import { HttpGetClient } from '@/data/protocols/http/http-get-client';
import { NotFoundError } from '@/domain/errors/not-found-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { Video, VideoByUrlResponse } from '@/domain/models/video-model';
import {
  SearchVideoByUrl,
  SearchVideoByUrlParams,
  SearchVideoByUrlResponse
} from '@/domain/usecases/search-video-by-url';
import { getVideoIdByVideoUrl } from '@/services/youtube';
import { getFormattedDateString } from '@/utils/date';

export type GetSearchVideoByUrlResponse = {
  items: VideoByUrlResponse[];
};

export class RemoteSearchVideoByUrl implements SearchVideoByUrl {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<
      SearchVideoByUrlParams,
      GetSearchVideoByUrlResponse
    >
  ) {}

  async search(videoUrl: string): Promise<SearchVideoByUrlResponse> {
    const id = getVideoIdByVideoUrl(videoUrl);

    const { statusCode, data } = await this.httpGetClient.get({
      url: this.url,
      params: {
        id
      }
    });

    if (statusCode !== 200) {
      const error = new UnexpectedError();
      return {
        errorMessage: error.message
      };
    }

    if (!data?.items || data?.items?.length === 0) {
      const error = new NotFoundError();
      return {
        errorMessage: error.message
      };
    }

    const video: Video = data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnails: item.snippet.thumbnails,
      publishedAt: getFormattedDateString(item.snippet.publishedAt)
    }))[0];

    return { video, success: 'Vídeo adicionado com sucesso :D' };
  }
}
