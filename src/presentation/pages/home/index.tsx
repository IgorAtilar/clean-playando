import { CSSProperties, useState } from 'react';
import { SearchVideos } from '@/domain/usecases/search-videos';
import { Video } from '@/domain/models/video-model';
import { SaveVideo } from '@/domain/usecases/save-video';
import { Playlist } from '@/domain/usecases/playlist';
import { RemoveVideo } from '@/domain/usecases/remove-video';
import { FilterPlaylist } from '@/domain/usecases/filter-playlist';
import { RemoveFilterOnPlaylist } from '@/domain/usecases/remove-filter-of-playlist';
import { SearchVideoByUrl } from '@/domain/usecases/search-video-by-url';
import { SearchVideosModal, Player, FilterBarType, SearchBarType } from '@/presentation/components';
import { isYoutubeVideoUrl } from '@/services/youtube';

import {
  Container,
  FilterBar,
  Logo,
  MAIN_CONTAINER_OVERFLOW,
  MAIN_CONTAINER_POSITION,
  PlaylistContainer,
  SearchBar
} from './styles';

export type HomeProps = {
  searchVideos: SearchVideos;
  searchVideoByUrl: SearchVideoByUrl;
  saveVideo: SaveVideo;
  playlist: Playlist;
  removeVideo: RemoveVideo;
  filterPlaylist: FilterPlaylist;
  removeFilterOnPlaylist: RemoveFilterOnPlaylist;
};

const getMainContainerStyle = (isModalOpen?: boolean) => {
  if (!isModalOpen) return {};

  return {
    [MAIN_CONTAINER_OVERFLOW]: 'hidden',
    [MAIN_CONTAINER_POSITION]: 'fixed'
  } as CSSProperties;
};

export function Home({
  searchVideos,
  saveVideo,
  searchVideoByUrl,
  playlist,
  removeVideo,
  filterPlaylist,
  removeFilterOnPlaylist
}: HomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [videos, setVideos] = useState<Video[]>();
  const [videoPlayingId, setVideoPlayingId] = useState<string>('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [filterBarType, setFilterBarType] = useState<FilterBarType>('filter');
  const [searchBarType, setSearchBarType] = useState<SearchBarType>('search');

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

  const handleSaveVideoByUrl = async (videoUrl: string) => {
    if (!videoUrl) return;

    const { video } = await searchVideoByUrl.search(videoUrl);

    handleSaveVideo(video);

    setSearchBarType('search');
  };

  const handleSearchBarInputChange = (value: string) => {
    if (isYoutubeVideoUrl(value)) return setSearchBarType('add');

    return setSearchBarType('search');
  };

  const handleTogglePlay = (id: string) => {
    if (id === videoPlayingId) return setVideoPlayingId('');

    return setVideoPlayingId(id);
  };

  const handleRemoveVideo = (id: string) => removeVideo.remove(id);

  const handleFilterPlaylist = (value: string) => {
    filterPlaylist.filter(value);
    setFilterBarType('clear');
  };

  const handleRemoveFilterOnPlaylist = () => {
    removeFilterOnPlaylist.remove();
    setFilterBarType('filter');
  };

  return (
    <Container style={getMainContainerStyle(true)}>
      <Logo />
      <SearchBar
        placeholder="Insira o link ou título do vídeo"
        onSearch={handleSubmit}
        searchBarType={searchBarType}
        onAdd={handleSaveVideoByUrl}
        onInputChange={handleSearchBarInputChange}
      />
      <FilterBar
        placeholder="Palavras-chave"
        onSubmit={handleFilterPlaylist}
        filterBarType={filterBarType}
        onClear={handleRemoveFilterOnPlaylist}
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
