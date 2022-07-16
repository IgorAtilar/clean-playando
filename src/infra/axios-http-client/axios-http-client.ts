import axios, { AxiosError } from 'axios';
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http';

export class AxiosHttpClient implements HttpGetClient<any, any> {
  constructor(private readonly key?: string, private readonly defaultParams?: any) {}

  async get({ url, params }: HttpGetParams<any>): Promise<HttpResponse<any>> {
    let errorMessage: string;
    let data: any;
    let status: number;

    try {
      const { data: httpResponseData, status: httpResponseStatus } = await axios.get<any>(url, {
        params: {
          ...params,
          ...this.defaultParams,
          ...(this.key && { key: this.key })
        }
      });

      data = httpResponseData;
      status = httpResponseStatus;
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
