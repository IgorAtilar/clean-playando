export enum HttpStatusCode {
  ok = 200
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  data?: T;
  errorMessage?: string;
};
