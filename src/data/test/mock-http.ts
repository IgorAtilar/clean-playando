import { HttpGetClient, HttpGetParams } from '../protocols/http/http-get-client';
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response';

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
