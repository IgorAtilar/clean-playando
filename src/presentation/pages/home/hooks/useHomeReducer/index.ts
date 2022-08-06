import { useReducer } from 'react';
import { Video } from '@/domain/models/video-model';
import { FilterBarType, SearchBarType } from '@/presentation/components';

export enum Action {
  SET_IS_SEARCH_VIDEOS_MODAL_OPEN = 'set_is_search_videos_modal_open',
  SET_SEARCH_VIDEOS_MODAL_ERROR_MESSAGE = 'set_search_videos_modal_error_message',
  SET_SEARCHED_VIDEOS_RESULT = 'set_searched_videos_result',
  SET_CURRENT_VIDEO_PLAYING_ID = 'set_current_video_playing_id',
  SET_IS_SEARCH_VIDEOS_LOADING = 'set_is_search_videos_loading',
  SET_FILTER_BAR_TYPE = 'set_filter_bar_type',
  SET_SEARCH_BAR_TYPE = 'set_search_bar_type'
}

export type HomeAction =
  | { type: Action.SET_IS_SEARCH_VIDEOS_MODAL_OPEN; payload: boolean }
  | {
      type: Action.SET_SEARCH_VIDEOS_MODAL_ERROR_MESSAGE;
      payload: string;
    }
  | { type: Action.SET_SEARCHED_VIDEOS_RESULT; payload: Video[] }
  | { type: Action.SET_CURRENT_VIDEO_PLAYING_ID; payload: string }
  | { type: Action.SET_IS_SEARCH_VIDEOS_LOADING; payload: boolean }
  | { type: Action.SET_FILTER_BAR_TYPE; payload: FilterBarType }
  | { type: Action.SET_SEARCH_BAR_TYPE; payload: SearchBarType };

type HomeState = {
  isSearchVideosModalOpen: boolean;
  isSearchVideosLoading: boolean;
  searchVideosModalErrorMessage?: string;
  searchedVideosResult?: Video[];
  currentPlayingVideoId?: string;
  filterBarType: FilterBarType;
  searchBarType: SearchBarType;
};

function homeStateReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case Action.SET_IS_SEARCH_VIDEOS_MODAL_OPEN: {
      const { payload } = action;
      return {
        ...state,
        isSearchVideosModalOpen: payload
      };
    }
    case Action.SET_SEARCH_VIDEOS_MODAL_ERROR_MESSAGE: {
      const { payload } = action;
      return {
        ...state,
        searchVideosModalErrorMessage: payload
      };
    }
    case Action.SET_SEARCHED_VIDEOS_RESULT: {
      const { payload } = action;
      return {
        ...state,
        searchedVideosResult: payload
      };
    }
    case Action.SET_CURRENT_VIDEO_PLAYING_ID: {
      const { payload } = action;
      return {
        ...state,
        currentPlayingVideoId: payload
      };
    }
    case Action.SET_IS_SEARCH_VIDEOS_LOADING: {
      const { payload } = action;
      return {
        ...state,
        isSearchVideosLoading: payload
      };
    }
    case Action.SET_FILTER_BAR_TYPE: {
      const { payload } = action;
      return {
        ...state,
        filterBarType: payload
      };
    }
    case Action.SET_SEARCH_BAR_TYPE: {
      const { payload } = action;
      return {
        ...state,
        searchBarType: payload
      };
    }
    default:
      return state;
  }
}

const initialHomeState = {
  isSearchVideosModalOpen: false,
  isSearchVideosLoading: false,
  searchVideosModalErrorMessage: '',
  searchedVideosResult: [],
  currentPlayingVideoId: '',
  filterBarType: 'filter' as FilterBarType,
  searchBarType: 'search' as SearchBarType
};

export function useHomeReducer() {
  const [state, dispatch] = useReducer(homeStateReducer, initialHomeState);

  return {
    state,
    dispatch
  };
}
