import { faker } from '@faker-js/faker';
import { SearchVideosResponse } from '@/domain/usecases/search-videos';
import { GetSearchVideosResponse } from '../usecases/search-videos/remote-search-video';

export const mockGetResponse = (): GetSearchVideosResponse => {
  const items = [
    {
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
        channelTitle: faker.lorem.words()
      }
    },
    {
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
        channelTitle: faker.lorem.words()
      }
    }
  ];

  return { items };
};

export const mockResponse = (response: GetSearchVideosResponse): SearchVideosResponse => {
  const videos = response.items.map((video) => ({
    id: video.id.videoId,
    title: video.snippet.title,
    channelTitle: video.snippet.channelTitle,
    thumbnails: video.snippet.thumbnails
  }));

  return { videos };
};
