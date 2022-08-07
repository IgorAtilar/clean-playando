import { useState } from 'react';
import YoutubePlayer from 'react-player/youtube';
import { Video } from '@/domain/models/video-model';
import CloseIcon from '@/presentation/assets/delete-icon.svg';

import { DeleteButton, Container } from './styles';

export type VideoCardProps = {
  position: string;
  video: Video;
  onPlay: (id: string) => void;
  onRemove: (id: string) => void;
};

export function VideoCard({
  position,
  video: { id, title, channelTitle, publishedAt },
  onPlay,
  onRemove
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Container>
      <button
        title="visualizar"
        type="button"
        onClick={() => onPlay(id)}
        onMouseEnter={() => setIsPlaying(true)}
        onMouseLeave={() => setIsPlaying(false)}>
        <YoutubePlayer
          playing
          controls={false}
          url={`https://www.youtube.com/watch?v=${id}&origin=http://localhost:3000`}
          config={{
            embedOptions: {
              controls: 0
            }
          }}
          width="100%"
          height="180px"
          style={{
            pointerEvents: 'none'
          }}
          light={!isPlaying}
          playIcon={<div />}
          muted
          loop
        />
      </button>
      <DeleteButton title="excluir da playlist" onClick={() => onRemove(id)}>
        <CloseIcon aria-label="ícone de excluir" />
      </DeleteButton>
      <h3>
        <span>{position}. </span>
        {title}
      </h3>
      <strong>{channelTitle}</strong>
      <span>{publishedAt}</span>
    </Container>
  );
}
