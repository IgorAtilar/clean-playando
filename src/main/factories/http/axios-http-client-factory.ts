import { AxiosHttpClient } from '@/infra/axios-http-client';
import { makeApiKey } from './api-key-factory';

const defaultParams = {
  part: 'snippet',
  type: 'video',
  videoEmbeddable: 'true'
};

export const makeAxiosHttpClient = (): AxiosHttpClient =>
  new AxiosHttpClient(makeApiKey(), defaultParams);
