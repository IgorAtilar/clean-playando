import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { playlistReducer } from '../slices/playlist';
import { LocalPlaylistOnStorage } from '@/data/usecases/local-playlist-on-storage/local-playlist-on-storage';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';
import { searchCacheReducer } from '../slices/search-cache';

const playlistOnStorage = new LocalPlaylistOnStorage(new PersistentStorageAdapter()).get();

const rootReducer = combineReducers({
  playlist: playlistReducer,
  searchCache: searchCacheReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    preloadedState
  });
}

const store = setupStore({
  playlist: {
    filteredVideos: playlistOnStorage,
    videos: playlistOnStorage
  }
});

export default store;
