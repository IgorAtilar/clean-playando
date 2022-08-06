import { useEffect, useRef, useState } from 'react';
import YoutubePlayer from 'react-player/youtube';
import { Video } from '@/domain/models/video-model';

import { ControlsContainer, Icon, Image, IconButton, YoutuberPlayerContainer } from './styles';

export const YOUTUBE_PLAYER_TEST_ID = 'youtube_player_test_id';

export type PlayerProps = {
  position: string;
  video: Video;
  isPlaying: boolean;
  onTogglePlay: (id: string) => void;
  onRemove: (id: string) => void;
};

export function Player({
  position,
  video: { id, thumbnailUrl, title },
  isPlaying,
  onTogglePlay,
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

  return (
    <YoutuberPlayerContainer>
      {isPlaying ? (
        <YoutubePlayer
          data-testid={YOUTUBE_PLAYER_TEST_ID}
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
          width="320px"
          height="180px"
          style={{
            pointerEvents: 'none'
          }}
        />
      ) : (
        <Image src={thumbnailUrl} alt={`thumbnail do vídeo ${title}`} />
      )}
      <ControlsContainer>
        {isPlaying ? (
          <IconButton title="pausar" onClick={() => onTogglePlay(id)}>
            <Icon src="./assets/pause-icon.svg" aria-label="ícone de pause" />
          </IconButton>
        ) : (
          <IconButton title="iniciar" onClick={() => onTogglePlay(id)}>
            <Icon src="./assets/play-icon.svg" aria-label="ícone de play" />
          </IconButton>
        )}
        <IconButton title="excluir da playlist" onClick={() => onRemove(id)}>
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
