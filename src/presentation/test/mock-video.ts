import { faker } from '@faker-js/faker';
import { Video } from '@/domain/models/video-model';

export const mockVideo = (): Video => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(),
  channelTitle: faker.lorem.words(),
  thumbnailUrl: faker.internet.url(),
  publishedAt: faker.datatype.datetime().toISOString()
});

export const mockVideos = (): Video[] => [mockVideo(), mockVideo(), mockVideo()];
