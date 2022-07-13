import { HttpGetClient } from '@/data/protocols/http/http-get-client';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { VideoListModel } from '@/domain/models/video-list-model';
import { SearchVideo, SearchVideosParams } from '@/domain/usecases/search-videos';

export class RemoteSearchVideo implements SearchVideo {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SearchVideosParams, VideoListModel>
  ) {}

  async search(params: SearchVideosParams): Promise<VideoListModel> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      params
    });

    if (httpResponse.statusCode !== 200) {
      throw new UnexpectedError();
    }

    return httpResponse.data;
  }
}
