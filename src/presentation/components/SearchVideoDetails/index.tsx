import { CSSProperties } from 'react';
import { Video } from '@/domain/models/video-model';
import { Button } from '../Button';

import { Body, Image, InfoContainer, SearchVideoDetailsContainer } from './styles';

export type SearchVideoDetailsProps = {
  video: Video;
  onAdd?: (video: Video) => void;
  className?: string;
};

export function SearchVideoDetails({ video, onAdd, className }: SearchVideoDetailsProps) {
  const { channelTitle, publishedAt, thumbnailUrl, title } = video;

  return (
    <SearchVideoDetailsContainer className={className}>
      <Image src={thumbnailUrl} alt={`thumbnail do vídeo ${title}`} />
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
