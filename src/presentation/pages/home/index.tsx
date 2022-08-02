import { useReducer } from 'react';
import { SearchVideos } from '@/domain/usecases/search-videos';
import { Video } from '@/domain/models/video-model';
import { SaveVideo } from '@/domain/usecases/save-video';
import { Playlist } from '@/domain/usecases/playlist';
import { RemoveVideo } from '@/domain/usecases/remove-video';
import { FilterPlaylist } from '@/domain/usecases/filter-playlist';
import { RemoveFilterOnPlaylist } from '@/domain/usecases/remove-filter-of-playlist';
import { SearchVideoByUrl } from '@/domain/usecases/search-video-by-url';
import { FilterBarType, SearchBarType } from '@/presentation/components';
import { isYoutubeVideoUrl } from '@/services/youtube';
import { HomeLayout } from '@/presentation/layouts/home';
import { HomeAction, HomeActionKind, HomeState } from './home.dtos';

export type HomeProps = {
  searchVideos: SearchVideos;
  searchVideoByUrl: SearchVideoByUrl;
  saveVideo: SaveVideo;
  playlist: Playlist;
  removeVideo: RemoveVideo;
  filterPlaylist: FilterPlaylist;
  removeFilterOnPlaylist: RemoveFilterOnPlaylist;
};

const homeStateReducer = (state: HomeState, action: HomeAction): HomeState => {
  switch (action.type) {
    case HomeActionKind.SET_IS_SEARCH_VIDEOS_MODAL_OPEN: {
      const { isSearchVideosModalOpen } = action;
      return {
        ...state,
        isSearchVideosModalOpen
      };
    }
    case HomeActionKind.SET_SEARCH_VIDEOS_MODAL_ERROR_MESSAGE: {
      const { searchVideosModalErrorMessage } = action;
      return {
        ...state,
        searchVideosModalErrorMessage
      };
    }
    case HomeActionKind.SET_SEARCHED_VIDEOS_RESULT: {
      const { searchedVideosResult } = action;
      return {
        ...state,
        searchedVideosResult
      };
    }
    case HomeActionKind.SET_CURRENT_VIDEO_PLAYING_ID: {
      const { currentPlayingVideoId } = action;
      return {
        ...state,
        currentPlayingVideoId
      };
    }
    case HomeActionKind.SET_IS_SEARCH_VIDEOS_LOADING: {
      const { isSearchVideosLoading } = action;
      return {
        ...state,
        isSearchVideosLoading
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
  isSearchVideosModalOpen: false,
  isSearchVideosLoading: false,
  searchVideosModalErrorMessage: '',
  searchedVideosResult: [],
  currentPlayingVideoId: '',
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
    isSearchVideosLoading,
    isSearchVideosModalOpen,
    searchBarType,
    currentPlayingVideoId,
    searchVideosModalErrorMessage,
    searchedVideosResult
  } = homeState;

  const playlistVideos = playlist.get();

  const handleSearch = async (value?: string) => {
    if (!value) return;

    if (isYoutubeVideoUrl(value)) {
      await handleSaveVideoByUrl(value);
      return;
    }

    dispatch({
      type: HomeActionKind.SET_IS_SEARCH_VIDEOS_MODAL_OPEN,
      isSearchVideosModalOpen: true
    });
    dispatch({
      type: HomeActionKind.SET_IS_SEARCH_VIDEOS_LOADING,
      isSearchVideosLoading: true
    });

    const { videos, errorMessage: searchVideosModalErrorMessage } = await searchVideos.search({
      query: value,
      maxResults: 4
    });

    dispatch({
      type: HomeActionKind.SET_SEARCHED_VIDEOS_RESULT,
      searchedVideosResult: videos
    });

    dispatch({
      type: HomeActionKind.SET_SEARCH_VIDEOS_MODAL_ERROR_MESSAGE,
      searchVideosModalErrorMessage
    });

    dispatch({
      type: HomeActionKind.SET_IS_SEARCH_VIDEOS_LOADING,
      isSearchVideosLoading: false
    });
  };

  const handleSaveVideoOnPlaylist = (video: Video) => {
    saveVideo.save(video);
  };

  const handleSaveVideoByUrl = async (videoUrl: string) => {
    dispatch({
      type: HomeActionKind.SET_SEARCH_BAR_TYPE,
      searchBarType: 'search'
    });

    const { video, errorMessage } = await searchVideoByUrl.search(videoUrl);

    if (errorMessage) return;

    handleSaveVideoOnPlaylist(video);
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
    if (id === currentPlayingVideoId)
      return dispatch({
        type: HomeActionKind.SET_CURRENT_VIDEO_PLAYING_ID,
        currentPlayingVideoId: ''
      });

    return dispatch({
      type: HomeActionKind.SET_CURRENT_VIDEO_PLAYING_ID,
      currentPlayingVideoId: id
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

  return (
    <HomeLayout
      filterBarType={filterBarType}
      searchBarType={searchBarType}
      playlistVideos={playlistVideos}
      isSearchVideosModalOpen={isSearchVideosModalOpen}
      isSearchVideosLoading={isSearchVideosLoading}
      onCloseSearchVideosModal={() =>
        dispatch({
          type: HomeActionKind.SET_IS_SEARCH_VIDEOS_MODAL_OPEN,
          isSearchVideosModalOpen: false
        })
      }
      onAddVideoToPlaylist={handleSaveVideoOnPlaylist}
      onClearFilter={handleRemoveFilterOnPlaylist}
      onFilter={handleFilterPlaylist}
      onRemoveVideoFromPlaylist={handleRemoveVideo}
      onSearch={handleSearch}
      onSearchBarInputChange={handleSearchBarInputChange}
      onTogglePlay={handleTogglePlay}
      currentPlayingVideoId={currentPlayingVideoId}
      searchVideosModalErrorMessage={searchVideosModalErrorMessage}
      searchedVideosResult={searchedVideosResult}
    />
  );
}
