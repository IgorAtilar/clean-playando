import { Video } from '@/domain/models/video-model';
import { FilterBarType, SearchBarType } from '@/presentation/components';

export enum HomeActionKind {
  SET_IS_SEARCH_VIDEOS_MODAL_OPEN = 'set_is_search_videos_modal_open',
  SET_SEARCH_VIDEOS_MODAL_ERROR_MESSAGE = 'set_search_videos_modal_error_message',
  SET_SEARCHED_VIDEOS_RESULT = 'set_searched_videos_result',
  SET_CURRENT_VIDEO_PLAYING_ID = 'set_current_video_playing_id',
  SET_IS_SEARCH_VIDEOS_LOADING = 'set_is_search_videos_loading',
  SET_FILTER_BAR_TYPE = 'set_filter_bar_type',
  SET_SEARCH_BAR_TYPE = 'set_search_bar_type'
}

export type HomeAction =
  | { type: HomeActionKind.SET_IS_SEARCH_VIDEOS_MODAL_OPEN; isSearchVideosModalOpen: boolean }
  | {
      type: HomeActionKind.SET_SEARCH_VIDEOS_MODAL_ERROR_MESSAGE;
      searchVideosModalErrorMessage: string;
    }
  | { type: HomeActionKind.SET_SEARCHED_VIDEOS_RESULT; searchedVideosResult: Video[] }
  | { type: HomeActionKind.SET_CURRENT_VIDEO_PLAYING_ID; currentPlayingVideoId: string }
  | { type: HomeActionKind.SET_IS_SEARCH_VIDEOS_LOADING; isSearchVideosLoading: boolean }
  | { type: HomeActionKind.SET_FILTER_BAR_TYPE; filterBarType: FilterBarType }
  | { type: HomeActionKind.SET_SEARCH_BAR_TYPE; searchBarType: SearchBarType };

export type HomeState = {
  isSearchVideosModalOpen: boolean;
  isSearchVideosLoading: boolean;
  searchVideosModalErrorMessage?: string;
  searchedVideosResult?: Video[];
  currentPlayingVideoId?: string;
  filterBarType: FilterBarType;
  searchBarType: SearchBarType;
};
