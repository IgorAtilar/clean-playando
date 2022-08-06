import { faker } from '@faker-js/faker';
import { SearchVideosResponse } from '@/domain/usecases/search-videos';
import { VideoResponse } from '@/domain/models/video-model';
import { GetSearchVideosResponse } from '@/data/usecases/remote-search-videos/remote-search-videos';
import { getFormattedDateString } from '@/utils/date';

export const mockGetResponseVideo = (): VideoResponse => ({
  id: {
    videoId: faker.datatype.uuid()
  },
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

export const mockGetResponse = (): GetSearchVideosResponse => {
  const items = [mockGetResponseVideo(), mockGetResponseVideo()];

  return { items };
};

export const mockResponse = (response: GetSearchVideosResponse): SearchVideosResponse => {
  const videos = response.items.map((video) => ({
    id: video.id.videoId,
    title: video.snippet.title,
    channelTitle: video.snippet.channelTitle,
    thumbnailUrl: video.snippet.thumbnails.medium.url,
    publishedAt: getFormattedDateString(video.snippet.publishedAt)
  }));

  return { videos };
};
