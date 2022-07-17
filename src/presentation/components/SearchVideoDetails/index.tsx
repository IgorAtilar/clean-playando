import { CSSProperties } from 'react';
import { Video } from '@/domain/models/video-model';
import { Button } from '../Button';

import {
  Body,
  Image,
  InfoContainer,
  SearchVideoDetailsContainer,
  IMAGE_HEIGHT_DEFAULT,
  IMAGE_WIDTH_DEFAULT,
  IMAGE_HEIGHT_MEDIUM,
  IMAGE_WIDTH_MEDIUM,
  IMAGE_URL_DEFAULT,
  IMAGE_URL_MEDIUM
} from './styles';

export type SearchVideoDetailsProps = {
  video: Video;
  onAdd?: (video: Video) => void;
  className?: string;
};

export function SearchVideoDetails({ video, onAdd, className }: SearchVideoDetailsProps) {
  const { channelTitle, publishedAt, thumbnails, title } = video;

  const imageStyle = {
    [IMAGE_HEIGHT_DEFAULT]: `${thumbnails.default.height}px`,
    [IMAGE_WIDTH_DEFAULT]: `${thumbnails.default.width}px`,
    [IMAGE_HEIGHT_MEDIUM]: `${thumbnails.medium.height - 48}px`,
    [IMAGE_WIDTH_MEDIUM]: `${thumbnails.medium.width - 48}px`,
    [IMAGE_URL_DEFAULT]: `url(${thumbnails.default.url})`,
    [IMAGE_URL_MEDIUM]: `url(${thumbnails.medium.url})`
  } as CSSProperties;

  return (
    <SearchVideoDetailsContainer className={className}>
      <Image style={imageStyle} alt={`thumbnail do vídeo ${title}`} />
      <Body>
        <InfoContainer>
          <strong>{title}</strong>
          <span>{channelTitle}</span>
          <span>{publishedAt}</span>
        </InfoContainer>
        <Button type="button" onClick={() => onAdd(video)}>
          Adicionar
        </Button>
      </Body>
    </SearchVideoDetailsContainer>
  );
}
