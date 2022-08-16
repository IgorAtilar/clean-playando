import { CSSProperties } from 'react';
import {
  FilterBarType,
  VideoCard,
  SearchBarType,
  SearchVideosModal,
  VideoPlayerModal
} from '@/presentation/components';
import { Video } from '@/domain/models/video-model';
import { EmptyState } from '@/presentation/components/EmptyState';

import {
  Container,
  FilterBar,
  Logo,
  MAIN_CONTAINER_OVERFLOW,
  MAIN_CONTAINER_POSITION,
  PlaylistContainer,
  SearchBar
} from './styles';

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

export type HomeLayoutProps = {
  isSearchVideosModalOpen: boolean;
  isSearchVideosLoading: boolean;
  onCloseSearchVideosModal: () => void;
  searchVideosModalErrorMessage?: string;
  searchedVideosResult: Video[];
  onAddVideoToPlaylist: (video: Video) => void;
  onSearch: (value: string) => void;
  searchBarType: SearchBarType;
  onSearchBarInputChange: (value: string) => void;
  onFilter: (value: string) => void;
  onClearFilter: () => void;
  filterBarType: FilterBarType;
  playlistVideos: Video[];
  currentPlayingVideoId?: string;
  onPlayVideo: (id: string) => void;
  isVideoPlayerModalOpen?: boolean;
  onCloseVideoPlayerModal: () => void;
  onRemoveVideoFromPlaylist: (id: string) => void;
};

export function HomeLayout({
  isSearchVideosModalOpen,
  onCloseSearchVideosModal,
  isSearchVideosLoading,
  searchVideosModalErrorMessage,
  searchedVideosResult,
  onSearch,
  searchBarType,
  onSearchBarInputChange,
  onFilter,
  filterBarType,
  onClearFilter,
  playlistVideos,
  currentPlayingVideoId,
  onPlayVideo,
  isVideoPlayerModalOpen,
  onRemoveVideoFromPlaylist,
  onAddVideoToPlaylist,
  onCloseVideoPlayerModal
}: HomeLayoutProps) {
  const hasPlaylistVideos = playlistVideos.length > 0;
  const isFilteringThePlaylist = filterBarType === 'clear';

  const isModalOpen = isSearchVideosModalOpen || isVideoPlayerModalOpen;

  return (
    <Container style={getMainContainerStyle(isModalOpen)}>
      <Logo />
      <SearchBar
        placeholder="Insira o link ou título do vídeo"
        onSubmit={onSearch}
        type={searchBarType}
        onInputChange={onSearchBarInputChange}
      />
      <FilterBar
        placeholder="Palavras-chave"
        onFilter={onFilter}
        type={filterBarType}
        onClearFilter={onClearFilter}
      />

      {hasPlaylistVideos ? (
        <PlaylistContainer>
          {playlistVideos.map((video, index) => (
            <VideoCard
              position={String(index + 1)}
              key={video.id}
              video={video}
              onPlay={onPlayVideo}
              onRemove={onRemoveVideoFromPlaylist}
            />
          ))}
        </PlaylistContainer>
      ) : (
        <EmptyState text={getEmptyStateText(isFilteringThePlaylist)} />
      )}
      <SearchVideosModal
        isOpen={isSearchVideosModalOpen}
        onClose={onCloseSearchVideosModal}
        errorMessage={searchVideosModalErrorMessage}
        videos={searchedVideosResult}
        onAdd={onAddVideoToPlaylist}
        isLoading={isSearchVideosLoading}
      />
      <VideoPlayerModal
        isOpen={isVideoPlayerModalOpen}
        videoId={currentPlayingVideoId}
        onClose={onCloseVideoPlayerModal}
      />
    </Container>
  );
}
