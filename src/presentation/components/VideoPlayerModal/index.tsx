import YoutubePlayer from 'react-player/youtube';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal';
import PlayIcon from '@/presentation/assets/play-icon.svg';
import PauseIcon from '@/presentation/assets/pause-icon.svg';
import CloseIcon from '@/presentation/assets/delete-icon.svg';

import {
  ControlsContainer,
  IconButton,
  ProgressBar,
  VolumeBar,
  PlayerContainer,
  CloseButton
} from './styles';

export type VideoPlayerProps = {
  isOpen?: boolean;
  onClose: () => void;
  videoId: string;
};

type ProgressState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

export function VideoPlayerModal({ isOpen, videoId, onClose }: VideoPlayerProps) {
  const playerRef = useRef<YoutubePlayer>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [played, setPlayed] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(1);

  const handleProgress = (state: ProgressState) => {
    if (isSeeking) return;
    setPlayed(state.played);
  };

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  useEffect(
    () => () => {
      setIsPlaying(true);
      setPlayed(0);
      setIsSeeking(false);
    },
    [isOpen]
  );

  useEffect(() => {
    if (playerRef.current && isSeeking) {
      playerRef.current.seekTo(played);
    }
  }, [played, isSeeking, isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <PlayerContainer>
        <YoutubePlayer
          stopOnUnmount
          ref={playerRef}
          playing={isPlaying}
          volume={volume}
          onEnded={() => setIsPlaying(false)}
          controls={false}
          url={`https://www.youtube.com/watch?v=${videoId}`}
          config={{
            playerVars: {
              showInfo: 0,
              controls: 0,
              origin: 'http://localhost:3000'
            }
          }}
          style={{
            pointerEvents: 'none'
          }}
          width="100%"
          height="100%"
          onProgress={handleProgress}
        />
        <CloseButton title="fechar" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <ControlsContainer>
          {isPlaying ? (
            <IconButton title="pausar" onClick={() => setIsPlaying(false)}>
              <PauseIcon />
            </IconButton>
          ) : (
            <IconButton title="reproduzir" onClick={() => setIsPlaying(true)}>
              <PlayIcon />
            </IconButton>
          )}
          <ProgressBar
            type="range"
            value={played}
            min={0}
            max={0.999999}
            step="any"
            onChange={handleSeekChange}
            onMouseDown={() => setIsSeeking(true)}
            onMouseUp={() => setIsSeeking(false)}
            title="duração"
          />
          <VolumeBar
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={handleVolumeChange}
            title="volume"
          />
        </ControlsContainer>
      </PlayerContainer>
    </Modal>
  );
}
