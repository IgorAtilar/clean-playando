import { VideoListModel } from '@/domain/models/video-list-model';
import { SearchVideosParams } from '@/domain/usecases/search-videos';
import { HttpGetClientSpy } from '@/data/test/mock-http';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { RemoteSearchVideo } from './remote-search-video';

describe('RemoteSearchVideo', () => {
  it('should call HttpGetClient with correct url', async () => {
    const url = 'any_url';
    const httpGetClientSpy = new HttpGetClientSpy<SearchVideosParams, VideoListModel>();
    const remoteSearchVideo = new RemoteSearchVideo(url, httpGetClientSpy);
    await remoteSearchVideo.search({ query: 'any_search' });
    expect(httpGetClientSpy.url).toBe(url);
  });

  it('should call HttpGetClient with correct params', async () => {
    const url = 'any_url';
    const params = {
      query: 'any_query',
      maxResults: 5
    };

    const httpGetClientSpy = new HttpGetClientSpy<SearchVideosParams, VideoListModel>();
    const remoteSearchVideo = new RemoteSearchVideo(url, httpGetClientSpy);
    await remoteSearchVideo.search(params);

    expect(httpGetClientSpy.params).toBe(params);
  });

  it('should throw UnexpectedError if HttpGetClient returns status code different of 200', async () => {
    const url = 'any_url';
    const httpGetClientSpy = new HttpGetClientSpy<SearchVideosParams, VideoListModel>();
    httpGetClientSpy.response = {
      statusCode: 400
    };
    const remoteSearchVideo = new RemoteSearchVideo(url, httpGetClientSpy);
    const errorPromise = remoteSearchVideo.search({
      query: 'any_search'
    });
    await expect(errorPromise).rejects.toThrow(new UnexpectedError());
  });

  it('should return VideoModel if HttpGetClient return status code 200', async () => {
    const url = 'any_url';
    const httpGetClientSpy = new HttpGetClientSpy<SearchVideosParams, VideoListModel>();
    const mockResponse = {
      videos: [
        {
          id: '01',
          title: 'title'
        }
      ]
    };

    httpGetClientSpy.response = {
      statusCode: 200,
      body: mockResponse
    };
    const remoteSearchVideo = new RemoteSearchVideo(url, httpGetClientSpy);

    const response = await remoteSearchVideo.search({ query: 'any_search' });

    expect(response).toBe(mockResponse);
  });
});
