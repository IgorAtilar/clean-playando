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
  const playlist = state.videos.filter((video) =>
    searchArray.every((word) => video.title.toLowerCase().includes(word))
  );

  return {
    ...state,
    filteredVideos: playlist
  };
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addToPlaylist: (state: PlaylistSliceState, action: PayloadAction<Video>) => ({
      ...state,
      videos: [...state.videos, action.payload],
      filteredVideos: [...state.videos, action.payload]
    }),
    removeFromPlaylist: (state: PlaylistSliceState, action: PayloadAction<{ id: string }>) => ({
      ...state,
      videos: [...state.videos.filter((video) => video.id !== action.payload.id)],
      filteredVideos: [...state.videos.filter((video) => video.id !== action.payload.id)]
    }),
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
