import { faker } from '@faker-js/faker';
import { SearchVideoByUrlParams } from '@/domain/usecases/search-video-by-url';
import { HttpGetClientSpy } from '@/data/test/mock-http';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { RemoteSearchVideoByUrl, GetSearchVideoByUrlResponse } from './remote-search-video-by-url';
import { mockGetResponse, mockResponse } from '@/data/test/mock-remote-search-video-by-url';
import { getVideoIdByVideoUrl } from '@/services/youtube';

describe('Data: RemoteSearchVideoByUrl', () => {
  it('should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy<
      SearchVideoByUrlParams,
      GetSearchVideoByUrlResponse
    >();
    const remoteSearchVideoByUrl = new RemoteSearchVideoByUrl(url, httpGetClientSpy);
    await remoteSearchVideoByUrl.search('any_video_url');
    expect(httpGetClientSpy.url).toBe(url);
  });

  it('should call HttpGetClient with correct params', async () => {
    const url = faker.internet.url();
    const videoUrl = 'https://www.youtube.com/watch?v=tw7HYXK2104&t=708s';
    const params = {
      id: getVideoIdByVideoUrl(videoUrl)
    };

    const httpGetClientSpy = new HttpGetClientSpy<
      SearchVideoByUrlParams,
      GetSearchVideoByUrlResponse
    >();
    const remoteSearchVideoByUrl = new RemoteSearchVideoByUrl(url, httpGetClientSpy);
    await remoteSearchVideoByUrl.search(videoUrl);

    expect(httpGetClientSpy.params).toStrictEqual(params);
  });

  it('should return UnexpectedError message as errorMessage if HttpGetClient returns status code different of 200', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy<
      SearchVideoByUrlParams,
      GetSearchVideoByUrlResponse
    >();
    httpGetClientSpy.response = {
      statusCode: 400
    };
    const remoteSearchVideoByUrl = new RemoteSearchVideoByUrl(url, httpGetClientSpy);
    const { video, errorMessage } = await remoteSearchVideoByUrl.search('any_video_url');
    expect(errorMessage).toBe(new UnexpectedError().message);
    expect(video).toBeUndefined();
  });

  it('should return the first video if HttpGetClient return status code 200', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy<
      SearchVideoByUrlParams,
      GetSearchVideoByUrlResponse
    >();
    const getResponse = mockGetResponse();

    httpGetClientSpy.response = {
      statusCode: 200,
      data: getResponse
    };

    const remoteSearchVideoByUrl = new RemoteSearchVideoByUrl(url, httpGetClientSpy);

    const response = await remoteSearchVideoByUrl.search('any_video_url');

    expect(response).toStrictEqual(mockResponse(getResponse));
  });
});
