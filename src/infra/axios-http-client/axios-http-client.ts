import axios, { AxiosError } from 'axios';
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http';

export class AxiosHttpClient<T, R> implements HttpGetClient<T, R> {
  async get({ url, params }: HttpGetParams<T>): Promise<HttpResponse<R>> {
    let errorMessage: string;
    let data: R;
    let status: number;

    try {
      const httpResponse = await axios.get<R>(url, params);
      data = httpResponse.data;
      status = httpResponse.status;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        errorMessage = error.message;
        status = error.response.status;
      }
    }

    return {
      statusCode: status,
      data,
      errorMessage
    };
  }
}
