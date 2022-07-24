import { CSSProperties, useReducer } from 'react';
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

export type HomeState = {
  isModalOpen: boolean;
  isToastOpen: boolean;
  toastType: ToastType;
  toastText: string;
  modalErrorMessage: string;
  videos: Video[];
  videoPlayingId: string;
  isSearchLoading: boolean;
  filterBarType: FilterBarType;
  searchBarType: SearchBarType;
};

export enum HomeActionKind {
  SET_IS_MODAL_OPEN = 'set_is_modal_open',
  SET_IS_TOAST_OPEN = 'set_is_toast_open',
  SET_TOAST_TYPE = 'set_toast_type',
  SET_TOAST_TEXT = 'set_toast_text',
  SET_MODAL_ERROR_MESSAGE = 'set_modal_error_message',
  SET_VIDEOS = 'set_videos',
  SET_VIDEO_PLAYING_ID = 'set_video_playing_id',
  SET_IS_SEARCH_LOADING = 'set_is_search_loading',
  SET_FILTER_BAR_TYPE = 'set_filter_bar_type',
  SET_SEARCH_BAR_TYPE = 'set_search_bar_type'
}

export type HomeAction =
  | { type: HomeActionKind.SET_IS_MODAL_OPEN; isModalOpen: boolean }
  | { type: HomeActionKind.SET_IS_TOAST_OPEN; isToastOpen: boolean }
  | { type: HomeActionKind.SET_TOAST_TYPE; toastType: ToastType }
  | { type: HomeActionKind.SET_TOAST_TEXT; toastText: string }
  | { type: HomeActionKind.SET_MODAL_ERROR_MESSAGE; modalErrorMessage: string }
  | { type: HomeActionKind.SET_VIDEOS; videos: Video[] }
  | { type: HomeActionKind.SET_VIDEO_PLAYING_ID; videoPlayingId: string }
  | { type: HomeActionKind.SET_IS_SEARCH_LOADING; isSearchLoading: boolean }
  | { type: HomeActionKind.SET_FILTER_BAR_TYPE; filterBarType: FilterBarType }
  | { type: HomeActionKind.SET_SEARCH_BAR_TYPE; searchBarType: SearchBarType };

const homeStateReducer = (state: HomeState, action: HomeAction): HomeState => {
  switch (action.type) {
    case HomeActionKind.SET_IS_MODAL_OPEN: {
      const { isModalOpen } = action;
      return {
        ...state,
        isModalOpen
      };
    }
    case HomeActionKind.SET_IS_TOAST_OPEN: {
      const { isToastOpen } = action;
      return {
        ...state,
        isToastOpen
      };
    }
    case HomeActionKind.SET_TOAST_TYPE: {
      const { toastType } = action;
      return {
        ...state,
        toastType
      };
    }
    case HomeActionKind.SET_TOAST_TEXT: {
      const { toastText } = action;
      return {
        ...state,
        toastText
      };
    }
    case HomeActionKind.SET_MODAL_ERROR_MESSAGE: {
      const { modalErrorMessage } = action;
      return {
        ...state,
        modalErrorMessage
      };
    }
    case HomeActionKind.SET_VIDEOS: {
      const { videos } = action;
      return {
        ...state,
        videos
      };
    }
    case HomeActionKind.SET_VIDEO_PLAYING_ID: {
      const { videoPlayingId } = action;
      return {
        ...state,
        videoPlayingId
      };
    }
    case HomeActionKind.SET_IS_SEARCH_LOADING: {
      const { isSearchLoading } = action;
      return {
        ...state,
        isSearchLoading
      };
    }
    case HomeActionKind.SET_FILTER_BAR_TYPE: {
      const { filterBarType } = action;
      return {
        ...state,
        filterBarType
      };
    }
    case HomeActionKind.SET_SEARCH_BAR_TYPE: {
      const { searchBarType } = action;
      return {
        ...state,
        searchBarType
      };
    }
    default:
      return state;
  }
};

const initialHomeState = {
  isModalOpen: false,
  isToastOpen: false,
  toastType: 'success' as ToastType,
  toastText: '',
  modalErrorMessage: '',
  videos: [],
  videoPlayingId: '',
  isSearchLoading: false,
  filterBarType: 'filter' as FilterBarType,
  searchBarType: 'search' as SearchBarType
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
  const [homeState, dispatch] = useReducer(homeStateReducer, initialHomeState);

  const {
    filterBarType,
    isModalOpen,
    isSearchLoading,
    isToastOpen,
    modalErrorMessage,
    searchBarType,
    toastText,
    toastType,
    videoPlayingId,
    videos
  } = homeState;

  const playlistVideos = playlist.get();

  const handleSearch = async (value?: string) => {
    if (!value) return;

    dispatch({
      type: HomeActionKind.SET_IS_MODAL_OPEN,
      isModalOpen: true
    });
    dispatch({
      type: HomeActionKind.SET_IS_SEARCH_LOADING,
      isSearchLoading: true
    });

    const { videos, errorMessage: modalErrorMessage } = await searchVideos.search({
      query: value,
      maxResults: 4
    });

    dispatch({
      type: HomeActionKind.SET_VIDEOS,
      videos
    });

    dispatch({
      type: HomeActionKind.SET_MODAL_ERROR_MESSAGE,
      modalErrorMessage
    });

    dispatch({
      type: HomeActionKind.SET_IS_SEARCH_LOADING,
      isSearchLoading: false
    });
  };

  const handleSaveVideo = (video: Video) => {
    if (isToastOpen) {
      dispatch({
        type: HomeActionKind.SET_IS_TOAST_OPEN,
        isToastOpen: false
      });
    }

    const { errorMessage, success } = saveVideo.save(video);
    const toastType = errorMessage ? 'error' : 'success';
    const toastText = errorMessage || success;

    dispatch({
      type: HomeActionKind.SET_TOAST_TYPE,
      toastType
    });
    dispatch({
      type: HomeActionKind.SET_TOAST_TEXT,
      toastText
    });
    dispatch({
      type: HomeActionKind.SET_IS_TOAST_OPEN,
      isToastOpen: true
    });
  };

  const handleSaveVideoByUrl = async (videoUrl: string) => {
    if (!videoUrl) return;

    dispatch({
      type: HomeActionKind.SET_SEARCH_BAR_TYPE,
      searchBarType: 'search'
    });

    const { video, errorMessage, success } = await searchVideoByUrl.search(videoUrl);

    const toastType = errorMessage ? 'error' : 'success';
    const toastText = errorMessage || success;

    dispatch({
      type: HomeActionKind.SET_TOAST_TYPE,
      toastType
    });
    dispatch({
      type: HomeActionKind.SET_TOAST_TEXT,
      toastText
    });
    dispatch({
      type: HomeActionKind.SET_IS_TOAST_OPEN,
      isToastOpen: true
    });

    if (errorMessage) return;

    handleSaveVideo(video);
  };

  const handleSearchBarInputChange = (value: string) => {
    if (isYoutubeVideoUrl(value))
      return dispatch({
        type: HomeActionKind.SET_SEARCH_BAR_TYPE,
        searchBarType: 'add'
      });

    return dispatch({
      type: HomeActionKind.SET_SEARCH_BAR_TYPE,
      searchBarType: 'search'
    });
  };

  const handleTogglePlay = (id: string) => {
    if (id === videoPlayingId)
      return dispatch({
        type: HomeActionKind.SET_VIDEO_PLAYING_ID,
        videoPlayingId: ''
      });

    return dispatch({
      type: HomeActionKind.SET_VIDEO_PLAYING_ID,
      videoPlayingId: id
    });
  };

  const handleRemoveVideo = (id: string) => removeVideo.remove(id);

  const handleFilterPlaylist = (value: string) => {
    filterPlaylist.filter(value);
    return dispatch({
      type: HomeActionKind.SET_FILTER_BAR_TYPE,
      filterBarType: 'clear'
    });
  };

  const handleRemoveFilterOnPlaylist = () => {
    removeFilterOnPlaylist.remove();
    return dispatch({
      type: HomeActionKind.SET_FILTER_BAR_TYPE,
      filterBarType: 'filter'
    });
  };

  const hasPlaylistVideos = playlistVideos?.length > 0;

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
          dispatch({
            type: HomeActionKind.SET_IS_MODAL_OPEN,
            isModalOpen: false
          })
        }
        errorMessage={modalErrorMessage}
        videos={videos}
        onAdd={handleSaveVideo}
        isLoading={isSearchLoading}
      />
      <Toast
        text={toastText}
        isOpen={isToastOpen}
        type={toastType}
        closeToast={() =>
          dispatch({
            type: HomeActionKind.SET_IS_TOAST_OPEN,
            isToastOpen: false
          })
        }
      />
    </Container>
  );
}
