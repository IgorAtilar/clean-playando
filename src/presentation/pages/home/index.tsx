import { useState } from 'react';
import { SearchVideos } from '@/domain/usecases/search-videos';
import { Video } from '@/domain/models/video-model';
import { SaveVideo } from '@/domain/usecases/save-video';
import { Playlist } from '@/domain/usecases/playlist';
import { Player } from '@/presentation/components/Player';
import { SearchVideosModal } from '@/presentation/components';

import { Container, Logo, PlaylistContainer, SearchBar } from './styles';

export type HomeProps = {
  searchVideos: SearchVideos;
  saveVideo: SaveVideo;
  playlist: Playlist;
};

export function Home({ searchVideos, saveVideo, playlist }: HomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [videos, setVideos] = useState<Video[]>();
  const [videoPlayingId, setVideoPlayingId] = useState<string>('');

  const playlistVideos = playlist.get();

  const handleSubmit = async (value?: string) => {
    if (!value) return;
    setIsOpen(true);

    const { videos, errorMessage } = await searchVideos.search({
      q: value,
      maxResults: 4
    });
    setVideos(videos);
    setErrorMessage(errorMessage);
  };

  const handleSaveVideo = (video: Video) => {
    saveVideo.save(video);
  };

  const handleTogglePlay = (id: string) => {
    if (id === videoPlayingId) return setVideoPlayingId('');

    return setVideoPlayingId(id);
  };

  return (
    <Container>
      <Logo />
      <SearchBar
        placeholder="Insira o link ou título do vídeo"
        onSubmit={handleSubmit}
        searchBarType="search"
      />
      <SearchVideosModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        errorMessage={errorMessage}
        videos={videos}
        onAdd={handleSaveVideo}
      />
      <PlaylistContainer>
        {playlistVideos.map((video) => (
          <Player
            key={video.id}
            isPlaying={video.id === videoPlayingId}
            video={video}
            togglePlay={handleTogglePlay}
          />
        ))}
      </PlaylistContainer>
    </Container>
  );
}
