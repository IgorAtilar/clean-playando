import { SearchVideos } from '@/domain/usecases/search-videos';
import { Video } from '@/domain/models/video-model';
import { SaveVideo } from '@/domain/usecases/save-video';
import { Playlist } from '@/domain/usecases/playlist';
import { RemoveVideo } from '@/domain/usecases/remove-video';
import { FilterPlaylist } from '@/domain/usecases/filter-playlist';
import { RemoveFilterOnPlaylist } from '@/domain/usecases/remove-filter-of-playlist';
import { SearchVideoByUrl } from '@/domain/usecases/search-video-by-url';
import { isYoutubeVideoUrl } from '@/services/youtube';
import { HomeLayout } from '@/presentation/layouts/home';
import { useHomeReducer, Action } from './hooks/useHomeReducer';

export type HomeProps = {
  searchVideos: SearchVideos;
  searchVideoByUrl: SearchVideoByUrl;
  saveVideo: SaveVideo;
  playlist: Playlist;
  removeVideo: RemoveVideo;
  filterPlaylist: FilterPlaylist;
  removeFilterOnPlaylist: RemoveFilterOnPlaylist;
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
  const { state, dispatch } = useHomeReducer();

  const {
    filterBarType,
    isSearchVideosLoading,
    isSearchVideosModalOpen,
    searchBarType,
    currentPlayingVideoId,
    searchVideosModalErrorMessage,
    searchedVideosResult
  } = state;

  const playlistVideos = playlist.get();

  const handleSearch = async (value?: string) => {
    if (!value) return;

    if (isYoutubeVideoUrl(value)) {
      await handleSaveVideoByUrl(value);
      return;
    }

    dispatch({
      type: Action.SET_IS_SEARCH_VIDEOS_MODAL_OPEN,
      payload: true
    });
    dispatch({
      type: Action.SET_IS_SEARCH_VIDEOS_LOADING,
      payload: true
    });

    const { videos, errorMessage } = await searchVideos.search({
      query: value,
      maxResults: 4
    });

    dispatch({
      type: Action.SET_SEARCHED_VIDEOS_RESULT,
      payload: videos
    });

    dispatch({
      type: Action.SET_SEARCH_VIDEOS_MODAL_ERROR_MESSAGE,
      payload: errorMessage
    });

    dispatch({
      type: Action.SET_IS_SEARCH_VIDEOS_LOADING,
      payload: false
    });
  };

  const handleSaveVideoOnPlaylist = (video: Video) => {
    saveVideo.save(video);
  };

  const handleSaveVideoByUrl = async (videoUrl: string) => {
    dispatch({
      type: Action.SET_SEARCH_BAR_TYPE,
      payload: 'search'
    });

    const { video, errorMessage } = await searchVideoByUrl.search(videoUrl);

    if (errorMessage) return;

    handleSaveVideoOnPlaylist(video);
  };

  const handleSearchBarInputChange = (value: string) => {
    if (isYoutubeVideoUrl(value))
      return dispatch({
        type: Action.SET_SEARCH_BAR_TYPE,
        payload: 'add'
      });

    return dispatch({
      type: Action.SET_SEARCH_BAR_TYPE,
      payload: 'search'
    });
  };

  const handleTogglePlay = (id: string) => {
    if (id === currentPlayingVideoId)
      return dispatch({
        type: Action.SET_CURRENT_VIDEO_PLAYING_ID,
        payload: ''
      });

    return dispatch({
      type: Action.SET_CURRENT_VIDEO_PLAYING_ID,
      payload: id
    });
  };

  const handleRemoveVideo = (id: string) => removeVideo.remove(id);

  const handleFilterPlaylist = (value: string) => {
    filterPlaylist.filter(value);
    return dispatch({
      type: Action.SET_FILTER_BAR_TYPE,
      payload: 'clear'
    });
  };

  const handleRemoveFilterOnPlaylist = () => {
    removeFilterOnPlaylist.remove();
    return dispatch({
      type: Action.SET_FILTER_BAR_TYPE,
      payload: 'filter'
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
          type: Action.SET_IS_SEARCH_VIDEOS_MODAL_OPEN,
          payload: false
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
