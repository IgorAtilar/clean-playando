export enum HttpStatusCode {
  ok = 200
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};
