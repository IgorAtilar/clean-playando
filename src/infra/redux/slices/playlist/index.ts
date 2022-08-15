import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '@/domain/models/video-model';
import { AppState } from '../../store';

export type PlaylistState = Video[];

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: [],
  reducers: {
    addToPlaylist: (state: PlaylistState, action: PayloadAction<Video>) => [
      ...state,
      action.payload
    ],
    removeFromPlaylist: (state: PlaylistState, action: PayloadAction<{ id: string }>) => [
      ...state.filter((video) => video.id !== action.payload.id)
    ],
    setPlaylist: (state: PlaylistState, action: PayloadAction<Video[]>) => action.payload
  }
});

export const selectPlaylist = (state: AppState) => state.playlist;

export const { addToPlaylist, setPlaylist, removeFromPlaylist } = playlistSlice.actions;

export const playlistReducer = playlistSlice.reducer;
