export type Thumbnails = {
  default: {
    url: string;
    width: number;
    height: number;
  };
  medium: {
    url: string;
    width: number;
    height: number;
  };
  high: {
    url: string;
    width: number;
    height: number;
  };
};

export type VideoResponse = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    publishedAt: string;
  };
};

export type VideoByUrlResponse = {
  id: string;
  snippet: {
    title: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    publishedAt: string;
  };
};

export type Video = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt: string;
};
