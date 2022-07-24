import { HttpGetClientSpy } from '@/data/test/mock-http';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import {
  RemoteSearchVideos,
  GetSearchVideosResponse,
  RawSearchVideoParams
} from './remote-search-videos';
import { mockGetResponse, mockResponse } from '@/data/test/mock-remote-search-videos';
import { GlobalStateMock } from '@/data/test/mock-global-state';

describe('Data: RemoteSearchVideo', () => {
  it('should call HttpGetClient with correct url', async () => {
    const url = 'any_url';
    const globalStateMock = new GlobalStateMock();
    const httpGetClientSpy = new HttpGetClientSpy<RawSearchVideoParams, GetSearchVideosResponse>();
    const remoteSearchVideo = new RemoteSearchVideos(url, httpGetClientSpy, globalStateMock);
    await remoteSearchVideo.search({ query: 'any_search' });
    expect(httpGetClientSpy.url).toBe(url);
  });

  it('should call HttpGetClient with correct params', async () => {
    const url = 'any_url';
    const params = {
      query: 'any_query',
      maxResults: 5
    };
    const globalStateMock = new GlobalStateMock();
    const httpGetClientSpy = new HttpGetClientSpy<RawSearchVideoParams, GetSearchVideosResponse>();
    const remoteSearchVideo = new RemoteSearchVideos(url, httpGetClientSpy, globalStateMock);
    await remoteSearchVideo.search(params);

    expect(httpGetClientSpy.params).toStrictEqual({
      q: params.query,
      maxResults: params.maxResults
    });
  });

  it('should return UnexpectedError message as errorMessage if HttpGetClient returns status code different of 200', async () => {
    const url = 'any_url';
    const globalStateMock = new GlobalStateMock();
    const httpGetClientSpy = new HttpGetClientSpy<RawSearchVideoParams, GetSearchVideosResponse>();
    httpGetClientSpy.response = {
      statusCode: 400
    };
    const remoteSearchVideo = new RemoteSearchVideos(url, httpGetClientSpy, globalStateMock);
    const { videos, errorMessage } = await remoteSearchVideo.search({
      query: 'any_search'
    });

    expect(errorMessage).toBe(new UnexpectedError().message);
    expect(videos).toBeUndefined();
  });

  it('should return Videos if HttpGetClient return status code 200', async () => {
    const url = 'any_url';
    const httpGetClientSpy = new HttpGetClientSpy<RawSearchVideoParams, GetSearchVideosResponse>();
    const globalStateMock = new GlobalStateMock();
    const getResponse = mockGetResponse();

    httpGetClientSpy.response = {
      statusCode: 200,
      data: getResponse
    };
    const remoteSearchVideo = new RemoteSearchVideos(url, httpGetClientSpy, globalStateMock);

    const response = await remoteSearchVideo.search({ query: 'any_search' });

    expect(response).toStrictEqual(mockResponse(getResponse));
  });
});
