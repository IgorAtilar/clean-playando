import { faker } from '@faker-js/faker';
import { HttpGetClient, HttpGetParams } from '../protocols/http/http-get-client';
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response';

export const mockSuccessfulHttpResponse = () => ({
  data: {
    id: faker.datatype.uuid(),
    title: faker.datatype.string()
  },
  status: faker.datatype.number()
});

export const mockFailureHttpResponse = () => ({
  message: faker.datatype.string(),
  response: {
    status: faker.datatype.number()
  }
});

export const mockGetRequest = (): HttpGetParams<any> => ({
  url: faker.internet.url(),
  params: {
    q: faker.datatype.string(),
    maxResults: faker.datatype.number()
  }
});

export class HttpGetClientSpy<T, R> implements HttpGetClient<T, R> {
  url?: string;

  params?: T;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  };

  async get(params: HttpGetParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.params = params.params;
    return Promise.resolve(this.response);
  }
}
