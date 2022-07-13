import axios from 'axios';
import { mockSuccessfulHttpResponse } from '@/data/test/mock-http';

export type MockedAxios = jest.Mocked<typeof axios>;

export const mockAxios = (): MockedAxios => {
  const mockedAxios = axios as MockedAxios;
  mockedAxios.get.mockResolvedValue(mockSuccessfulHttpResponse());

  return mockedAxios;
};
