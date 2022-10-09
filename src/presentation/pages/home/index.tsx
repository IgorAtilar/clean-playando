import { useEffect, useState } from 'react';
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
import { useToast } from '@/presentation/contexts/ToastContext';

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
  const [playlistVideos, setPlaylistVideos] = useState<Video[]>([]);
  const { state, dispatch } = useHomeReducer();
  const { showToast } = useToast();

  const {
    filterBarType,
    isSearchVideosLoading,
    isSearchVideosModalOpen,
    searchBarType,
    currentPlayingVideoId,
    searchVideosModalErrorMessage,
    searchedVideosResult,
    isPlayerVideoModalOpen
  } = state;

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
    const { success, errorMessage } = saveVideo.save(video);
    const text = success || errorMessage;
    const type = success ? 'success' : 'warning';

    showToast({
      text,
      type
    });
  };

  const handleSaveVideoByUrl = async (videoUrl: string) => {
    dispatch({
      type: Action.SET_SEARCH_BAR_TYPE,
      payload: 'search'
    });

    const { video, errorMessage } = await searchVideoByUrl.search(videoUrl);

    if (!video || errorMessage) {
      showToast({
        type: 'error',
        text: errorMessage
      });
      return;
    }

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

  const handlePlayVideo = (id: string) => {
    dispatch({
      type: Action.SET_CURRENT_VIDEO_PLAYING_ID,
      payload: id
    });

    dispatch({
      type: Action.SET_IS_VIDEO_PLAYER_MODAL_OPEN,
      payload: true
    });
  };

  const handleRemoveVideo = (id: string) => {
    removeVideo.remove(id);

    showToast({
      text: 'Vídeo removido com sucesso.',
      type: 'success'
    });
  };

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

  useEffect(() => {
    const localPlaylistVideos = playlist.get();
    setPlaylistVideos(localPlaylistVideos);
  });

  return (
    <HomeLayout
      isVideoPlayerModalOpen={isPlayerVideoModalOpen && !!currentPlayingVideoId}
      onCloseVideoPlayerModal={() =>
        dispatch({
          type: Action.SET_IS_VIDEO_PLAYER_MODAL_OPEN,
          payload: false
        })
      }
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
      onPlayVideo={handlePlayVideo}
      currentPlayingVideoId={currentPlayingVideoId}
      searchVideosModalErrorMessage={searchVideosModalErrorMessage}
      searchedVideosResult={searchedVideosResult}
    />
  );
}
