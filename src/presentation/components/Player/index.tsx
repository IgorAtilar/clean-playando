import { useEffect, useRef, useState } from 'react';
import YoutubePlayer from 'react-player/youtube';
import { Button } from '../Button';
import { Video } from '@/domain/models/video-model';

import { ControlsContainer, YoutuberPlayerContainer } from './styles';

export type PlayerProps = {
  video: Video;
  isPlaying?: boolean;
  togglePlay?: (id: string) => void;
  onRemove?: (id: string) => void;
};

export function Player({
  video: { id, thumbnails },
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

  // !TODO: Add static thumbnail

  return (
    <YoutuberPlayerContainer>
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
      <ControlsContainer>
        <Button onClick={() => togglePlay?.(id)}>{isPlaying ? 'Pausar' : 'Play'}</Button>
        <Button onClick={() => onRemove?.(id)} colorScheme="secondary">
          Excluir
        </Button>
      </ControlsContainer>
    </YoutuberPlayerContainer>
  );
}
