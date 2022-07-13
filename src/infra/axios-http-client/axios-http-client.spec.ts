import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';
import { mockFailureHttpResponse, mockGetRequest } from '@/data/test/mock-http';
import { mockAxios, MockedAxios } from '../test';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient<any, any>;
  mockedAxios: MockedAxios;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios
  };
};

describe('Infra: AxiosHttpClient', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call axios with correct values', async () => {
    const request = mockGetRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.get(request);
    expect(mockedAxios.get).toHaveBeenCalledWith(request.url, request.params);
  });

  it('should return the correct statusCode and data', () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.get(mockGetRequest());
    expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
  });

  it('should return the correct statusCode and errorMessage on failure', () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.get.mockRejectedValueOnce(mockFailureHttpResponse());

    const promise = sut.get(mockGetRequest());
    expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
  });
});
