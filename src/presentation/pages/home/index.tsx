import { useState } from 'react';
import { SearchVideos } from '@/domain/usecases/search-videos';
import { Video } from '@/domain/models/video-model';
import { SaveVideo } from '@/domain/usecases/save-video';
import { Playlist } from '@/domain/usecases/playlist';
import { RemoveVideo } from '@/domain/usecases/remove-video';
import { SearchVideosModal, Player } from '@/presentation/components';

import { Container, FilterBar, Logo, PlaylistContainer, SearchBar } from './styles';

export type HomeProps = {
  searchVideos: SearchVideos;
  saveVideo: SaveVideo;
  playlist: Playlist;
  removeVideo: RemoveVideo;
};

export function Home({ searchVideos, saveVideo, playlist, removeVideo }: HomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [videos, setVideos] = useState<Video[]>();
  const [videoPlayingId, setVideoPlayingId] = useState<string>('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const playlistVideos = playlist.get();

  const handleSubmit = async (value?: string) => {
    if (!value) return;
    setIsOpen(true);
    setIsSearchLoading(true);

    const { videos, errorMessage } = await searchVideos.search({
      q: value,
      maxResults: 4
    });

    setVideos(videos);
    setErrorMessage(errorMessage);
    setIsSearchLoading(false);
  };

  const handleSaveVideo = (video: Video) => {
    saveVideo.save(video);
  };

  const handleTogglePlay = (id: string) => {
    if (id === videoPlayingId) return setVideoPlayingId('');

    return setVideoPlayingId(id);
  };

  const handleRemoveVideo = (id: string) => removeVideo.remove(id);

  return (
    <Container>
      <Logo />
      <SearchBar
        placeholder="Insira o link ou título do vídeo"
        onSubmit={handleSubmit}
        searchBarType="search"
      />
      <FilterBar
        placeholder="Palavras-chave"
        onSubmit={(value) => console.log(value)}
        filterBarType="filter"
      />
      <SearchVideosModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        errorMessage={errorMessage}
        videos={videos}
        onAdd={handleSaveVideo}
        isLoading={isSearchLoading}
      />
      <PlaylistContainer>
        {playlistVideos.map((video) => (
          <Player
            key={video.id}
            isPlaying={video.id === videoPlayingId}
            video={video}
            togglePlay={handleTogglePlay}
            onRemove={handleRemoveVideo}
          />
        ))}
      </PlaylistContainer>
    </Container>
  );
}
