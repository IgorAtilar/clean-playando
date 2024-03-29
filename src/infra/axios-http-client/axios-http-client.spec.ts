import axios from 'axios';
import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from './axios-http-client';
import { mockFailureHttpResponse, mockGetRequest } from '@/data/test/mock-http';
import { mockAxios, MockedAxios } from '../test';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: MockedAxios;
};

const makeSut = (key?: string, defaultParams?: any): SutTypes => {
  const sut = new AxiosHttpClient(key, defaultParams);
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

    const params = {
      ...request.params
    };
    expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { params });
  });

  it('should call axios with correct values and key if its passed', async () => {
    const request = mockGetRequest();
    const key = faker.datatype.uuid();
    const { sut, mockedAxios } = makeSut(key);
    await sut.get(request);

    const params = {
      ...request.params,
      key
    };
    expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { params });
  });

  it('should return the correct statusCode and data', () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.get(mockGetRequest());
    expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
  });

  it('should return the correct statusCode on failure', () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.get.mockRejectedValueOnce(mockFailureHttpResponse());

    const promise = sut.get(mockGetRequest());
    expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
  });
});
