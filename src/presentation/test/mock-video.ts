import { faker } from '@faker-js/faker';
import { Video } from '@/domain/models/video-model';

export const mockVideo = (): Video => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(),
  channelTitle: faker.lorem.words(),
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
  publishedAt: faker.datatype.datetime().toISOString()
});

export const mockVideos = (): Video[] => [mockVideo(), mockVideo(), mockVideo()];
