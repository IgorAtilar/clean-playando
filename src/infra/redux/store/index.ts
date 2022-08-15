import { configureStore } from '@reduxjs/toolkit';
import { Video } from '@/domain/models/video-model';
import { playlistReducer } from '../slices/playlist';

export type AppState = {
  playlist: Video[];
};

const store = configureStore({
  reducer: {
    playlist: playlistReducer
  }
});

export default store;
