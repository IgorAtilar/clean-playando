import { configureStore } from '@reduxjs/toolkit';
import { playlistReducer } from '../slices/playlist';
import { LocalPlaylistOnStorage } from '@/data/usecases/local-playlist-on-storage/local-playlist-on-storage';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { searchCacheReducer } from '../slices/search-cache';

const playlistOnStorage = new LocalPlaylistOnStorage(new PersistentStorageAdapter()).get();

const store = configureStore({
  devTools: true,
  preloadedState: {
    playlist: {
      filteredVideos: playlistOnStorage,
      videos: playlistOnStorage
    }
  },
  reducer: {
    playlist: playlistReducer,
    searchCache: searchCacheReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
