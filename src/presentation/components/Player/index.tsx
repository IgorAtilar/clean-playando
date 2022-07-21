import { CSSProperties, useEffect, useRef, useState } from 'react';
import YoutubePlayer from 'react-player/youtube';
import { Video } from '@/domain/models/video-model';

import {
  ControlsContainer,
  Icon,
  Image,
  IMAGE_HEIGHT_MEDIUM,
  IMAGE_URL_MEDIUM,
  IMAGE_WIDTH_MEDIUM,
  IconButton,
  YoutuberPlayerContainer
} from './styles';

export type PlayerProps = {
  position: string;
  video: Video;
  isPlaying?: boolean;
  togglePlay?: (id: string) => void;
  onRemove?: (id: string) => void;
};

export function Player({
  position,
  video: { id, thumbnails, title },
  isPlaying,
  togglePlay,
  onRemove
}: PlayerProps) {
  const playerRef = useRef<YoutubePlayer>();
  let progress = 0;
  const [played, setPlayed] = useState<number>(0);

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  useEffect(() => {
    progress = played;
    if (playerRef.current) {
      playerRef.current.seekTo(progress);
    }
  }, [isPlaying]);

  const imageStyle = {
    [IMAGE_HEIGHT_MEDIUM]: `${thumbnails.medium.height}px`,
    [IMAGE_WIDTH_MEDIUM]: `${thumbnails.medium.width}px`,
    [IMAGE_URL_MEDIUM]: `url(${thumbnails.medium.url})`
  } as CSSProperties;

  return (
    <YoutuberPlayerContainer>
      {isPlaying ? (
        <YoutubePlayer
          ref={playerRef}
          playing={isPlaying}
          controls={false}
          url={`https://www.youtube.com/watch?v=${id}&origin=http://localhost:3000`}
          config={{
            embedOptions: {
              controls: 0
            }
          }}
          onProgress={handleProgress}
          width={`${thumbnails.medium.width}px`}
          height={`${thumbnails.medium.height}px`}
          style={{
            pointerEvents: 'none'
          }}
        />
      ) : (
        <Image style={imageStyle} alt={`thumbnail do vídeo ${title}`} />
      )}
      <ControlsContainer>
        {isPlaying ? (
          <IconButton title="pausar" onClick={() => togglePlay?.(id)}>
            <Icon src="./assets/pause-icon.svg" aria-label="ícone de pause" />
          </IconButton>
        ) : (
          <IconButton title="iniciar" onClick={() => togglePlay?.(id)}>
            <Icon src="./assets/play-icon.svg" aria-label="ícone de play" />
          </IconButton>
        )}
        <IconButton title="excluir da playlist" onClick={() => onRemove?.(id)}>
          <Icon src="./assets/delete-icon.svg" aria-label="ícone de excluir" />
        </IconButton>
      </ControlsContainer>
      <h3>
        <span>{position}. </span>
        {title}
      </h3>
    </YoutuberPlayerContainer>
  );
}
