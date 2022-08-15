import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '@/domain/models/video-model';
import { RootState } from '../../store';

export type PlaylistSliceState = {
  filteredVideos: Video[];
  videos: Video[];
};

const initialState: PlaylistSliceState = {
  videos: [],
  filteredVideos: []
};

const handleFilterPlaylist = (
  state: PlaylistSliceState,
  action: PayloadAction<{ pattern: string }>
): PlaylistSliceState => {
  const searchArray = action.payload.pattern.toLowerCase().split(' ');
  const filteredVideos = state.videos.filter((video) =>
    searchArray.every((word) => video.title.toLowerCase().includes(word))
  );

  return {
    ...state,
    filteredVideos
  };
};

const handleAddToPlaylist = (
  state: PlaylistSliceState,
  action: PayloadAction<Video>
): PlaylistSliceState => {
  const isVideoAdded = state.videos.find((video) => video.id === action.payload.id);
  if (isVideoAdded) return state;

  const currentVideos = [...state.videos, action.payload];

  return {
    ...state,
    videos: currentVideos,
    filteredVideos: currentVideos
  };
};

const handleRemoveFromPlaylist = (
  state: PlaylistSliceState,
  action: PayloadAction<{ id: string }>
) => {
  const currentVideos = [...state.videos.filter((video) => video.id !== action.payload.id)];

  return {
    videos: currentVideos,
    filteredVideos: currentVideos
  };
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addToPlaylist: handleAddToPlaylist,
    removeFromPlaylist: handleRemoveFromPlaylist,
    filterPlaylist: handleFilterPlaylist,
    removeFilterFromPlaylist: (state: PlaylistSliceState, action: PayloadAction) => ({
      ...state,
      filteredVideos: [...state.videos]
    })
  }
});

export const selectPlaylist = (state: RootState) => state.playlist.filteredVideos;

export const { addToPlaylist, removeFromPlaylist, filterPlaylist, removeFilterFromPlaylist } =
  playlistSlice.actions;

export const playlistReducer = playlistSlice.reducer;
