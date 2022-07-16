import { SearchVideosParams } from '@/domain/usecases/search-videos';
import { HttpGetClientSpy } from '@/data/test/mock-http';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { RemoteSearchVideo, GetSearchVideosResponse } from './remote-search-video';
import { mockGetResponse, mockResponse } from '@/data/test/mock-remote-search-video';

describe('Data: RemoteSearchVideo', () => {
  it('should call HttpGetClient with correct url', async () => {
    const url = 'any_url';
    const httpGetClientSpy = new HttpGetClientSpy<SearchVideosParams, GetSearchVideosResponse>();
    const remoteSearchVideo = new RemoteSearchVideo(url, httpGetClientSpy);
    await remoteSearchVideo.search({ q: 'any_search' });
    expect(httpGetClientSpy.url).toBe(url);
  });

  it('should call HttpGetClient with correct params', async () => {
    const url = 'any_url';
    const params = {
      q: 'any_query',
      maxResults: 5
    };

    const httpGetClientSpy = new HttpGetClientSpy<SearchVideosParams, GetSearchVideosResponse>();
    const remoteSearchVideo = new RemoteSearchVideo(url, httpGetClientSpy);
    await remoteSearchVideo.search(params);

    expect(httpGetClientSpy.params).toBe(params);
  });

  it('should throw UnexpectedError if HttpGetClient returns status code different of 200', async () => {
    const url = 'any_url';
    const httpGetClientSpy = new HttpGetClientSpy<SearchVideosParams, GetSearchVideosResponse>();
    httpGetClientSpy.response = {
      statusCode: 400
    };
    const remoteSearchVideo = new RemoteSearchVideo(url, httpGetClientSpy);
    const errorPromise = remoteSearchVideo.search({
      q: 'any_search'
    });
    await expect(errorPromise).rejects.toThrow(new UnexpectedError());
  });

  it('should return Videos if HttpGetClient return status code 200', async () => {
    const url = 'any_url';
    const httpGetClientSpy = new HttpGetClientSpy<SearchVideosParams, GetSearchVideosResponse>();
    const getResponse = mockGetResponse();

    httpGetClientSpy.response = {
      statusCode: 200,
      data: getResponse
    };
    const remoteSearchVideo = new RemoteSearchVideo(url, httpGetClientSpy);

    const response = await remoteSearchVideo.search({ q: 'any_search' });

    expect(response).toStrictEqual(mockResponse(getResponse));
  });
});
