import { faker } from '@faker-js/faker';
import { SearchVideoByUrlResponse } from '@/domain/usecases/search-video-by-url';
import { VideoByUrlResponse } from '@/domain/models/video-model';
import { GetSearchVideoByUrlResponse } from '@/data/usecases/remote-search-video-by-url/remote-search-video-by-url';
import { getFormattedDateString } from '@/utils/date';

export const mockGetResponseVideo = (): VideoByUrlResponse => ({
  id: faker.datatype.uuid(),
  snippet: {
    title: faker.lorem.words(),
    thumbnails: {
      default: {
        url: faker.internet.url(),
        width: faker.datatype.number(),
        height: faker.datatype.number()
      },
      high: {
        url: faker.internet.url(),
        width: faker.datatype.number(),
        height: faker.datatype.number()
      },
      medium: {
        url: faker.internet.url(),
        width: faker.datatype.number(),
        height: faker.datatype.number()
      }
    },
    channelTitle: faker.lorem.words(),
    publishedAt: faker.datatype.datetime().toISOString()
  }
});

export const mockGetResponse = (): GetSearchVideoByUrlResponse => {
  const items = [mockGetResponseVideo(), mockGetResponseVideo()];

  return { items };
};

export const mockResponse = (response: GetSearchVideoByUrlResponse): SearchVideoByUrlResponse => {
  const video = response.items.map((video) => ({
    id: video.id,
    title: video.snippet.title,
    channelTitle: video.snippet.channelTitle,
    thumbnailUrl: video.snippet.thumbnails.medium.url,
    publishedAt: getFormattedDateString(video.snippet.publishedAt)
  }))[0];

  return { video, success: 'Vídeo adicionado com sucesso :D' };
};
