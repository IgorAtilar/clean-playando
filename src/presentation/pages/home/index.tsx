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
import { EmptyState } from '@/presentation/components/EmptyState';
import { Toast, ToastType } from '@/presentation/components/Toast';

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

const getEmptyStateText = (isFilteringThePlaylist: boolean) => {
  if (isFilteringThePlaylist) return 'Nenhum vídeo encontrado :(';

  return 'Adicione um vídeo na sua playlist e ele aparecerá aqui :D';
};

export type State = {
  isModalOpen: boolean;
  isToastOpen: boolean;
  toastType: ToastType;
  toastText: string;
  errorMessage: string;
  videos: Video[];
  videoPlayingId: string;
  isSearchLoading: boolean;
  filterBarType: FilterBarType;
  searchBarType: SearchBarType;
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
  const [state, setState] = useState<State>({
    isModalOpen: false,
    isToastOpen: false,
    toastType: 'success',
    toastText: '',
    errorMessage: '',
    videos: [],
    videoPlayingId: '',
    isSearchLoading: false,
    filterBarType: 'filter',
    searchBarType: 'search'
  });

  const {
    errorMessage,
    filterBarType,
    isModalOpen,
    isSearchLoading,
    isToastOpen,
    searchBarType,
    toastText,
    toastType,
    videoPlayingId,
    videos
  } = state;

  const playlistVideos = playlist.get();

  const handleSearch = async (value?: string) => {
    if (!value) return;
    setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      isSearchLoading: true
    }));

    const { videos, errorMessage } = await searchVideos.search({
      q: value,
      maxResults: 4
    });

    setState((prevState) => ({
      ...prevState,
      videos,
      errorMessage,
      isSearchLoading: false
    }));
  };

  const handleSaveVideo = (video: Video) => {
    const { errorMessage, success } = saveVideo.save(video);
    const toastType = errorMessage ? 'error' : 'success';
    const toastText = errorMessage || success;

    setState((prevState) => ({
      ...prevState,
      toastType,
      toastText,
      isToastOpen: true
    }));
  };

  const handleSaveVideoByUrl = async (videoUrl: string) => {
    if (!videoUrl) return;

    const { video } = await searchVideoByUrl.search(videoUrl);

    handleSaveVideo(video);

    setState((prevState) => ({
      ...prevState,
      searchBarType: 'search'
    }));
  };

  const handleSearchBarInputChange = (value: string) => {
    if (isYoutubeVideoUrl(value))
      return setState((prevState) => ({
        ...prevState,
        searchBarType: 'add'
      }));

    return setState((prevState) => ({
      ...prevState,
      searchBarType: 'search'
    }));
  };

  const handleTogglePlay = (id: string) => {
    if (id === videoPlayingId)
      return setState((prevState) => ({
        ...prevState,
        videoPlayingId: ''
      }));

    return setState((prevState) => ({
      ...prevState,
      videoPlayingId: id
    }));
  };

  const handleRemoveVideo = (id: string) => removeVideo.remove(id);

  const handleFilterPlaylist = (value: string) => {
    filterPlaylist.filter(value);
    return setState((prevState) => ({
      ...prevState,
      filterBarType: 'clear'
    }));
  };

  const handleRemoveFilterOnPlaylist = () => {
    removeFilterOnPlaylist.remove();
    return setState((prevState) => ({
      ...prevState,
      filterBarType: 'filter'
    }));
  };

  const hasPlaylistVideos = playlistVideos.length > 0;

  const isFilteringThePlaylist = filterBarType === 'clear';

  return (
    <Container style={getMainContainerStyle(isModalOpen)}>
      <Logo />
      <SearchBar
        placeholder="Insira o link ou título do vídeo"
        onSearch={handleSearch}
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

      {hasPlaylistVideos ? (
        <PlaylistContainer>
          {playlistVideos.map((video, index) => (
            <Player
              position={String(index + 1)}
              key={video.id}
              isPlaying={video.id === videoPlayingId}
              video={video}
              togglePlay={handleTogglePlay}
              onRemove={handleRemoveVideo}
            />
          ))}
        </PlaylistContainer>
      ) : (
        <EmptyState text={getEmptyStateText(isFilteringThePlaylist)} />
      )}
      <SearchVideosModal
        isOpen={isModalOpen}
        onClose={() =>
          setState((prevState) => ({
            ...prevState,
            isModalOpen: false
          }))
        }
        errorMessage={errorMessage}
        videos={videos}
        onAdd={handleSaveVideo}
        isLoading={isSearchLoading}
      />
      <Toast
        text={toastText}
        isOpen={isToastOpen}
        type={toastType}
        closeToast={() =>
          setState((prevState) => ({
            ...prevState,
            isToastOpen: false
          }))
        }
      />
    </Container>
  );
}
