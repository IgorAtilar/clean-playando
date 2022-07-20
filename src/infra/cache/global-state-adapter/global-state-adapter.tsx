/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { Video } from '@/domain/models/video-model';
import {
  AddToPlaylistGlobalState,
  GetPlaylistFromGlobalState,
  FilterPlaylistOnGlobalState,
  RemoveFromPlaylistGlobalState,
  RemoveFilterOnPlaylistOnGlobalState
} from '@/data/protocols/cache/global-state';
import { PersistentStorageAdapter } from '../persistent-storage-adapter';

type GlobalStateData = {
  addToPlaylistState(value: Video): void;
  removeFromPlaylistState(id: string): void;
  filterPlaylistState(pattern: string): void;
  removeFilterOnPlaylistState(): void;
  playlistState: Video[];
};

type GlobalStateProps = PropsWithChildren;

export const GlobalStateContext = createContext<GlobalStateData>({} as GlobalStateData);

export const useGlobalState = (): GlobalStateData => useContext(GlobalStateContext);

const persistentStorage = new PersistentStorageAdapter();

const PLAYLIST_PERSISTENT_KEY = '@playando:playlist';

export function GlobalStateProvider({ children }: GlobalStateProps) {
  const playlistStateRef = useRef<Video[]>();
  const [playlistState, setPlaylistState] = useState<Video[]>(() =>
    persistentStorage.get(PLAYLIST_PERSISTENT_KEY)
  );
  const [filteredPlaylistState, setFilteredPlaylistState] = useState<Video[]>(playlistState);

  const prevPlaylistStateValue = playlistStateRef.current ?? playlistState;

  const addToPlaylistState = (video: Video) => {
    if (playlistState.find((value) => value.id === video.id)) return;

    setPlaylistState((prevVideos) => [...prevVideos, video]);
  };

  const removeFromPlaylistState = (id: string) => {
    setPlaylistState((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  const filterPlaylistState = (pattern: string) => {
    const searchArray = pattern.toLowerCase().split(' ');
    const filteredPlaylist = (playlistStateRef.current || []).filter((video) =>
      searchArray.every((word) => video.title.toLowerCase().includes(word))
    );
    setFilteredPlaylistState(filteredPlaylist);
  };

  const removeFilterOnPlaylistState = () => {
    setFilteredPlaylistState(playlistStateRef.current || []);
  };

  useEffect(() => {
    playlistStateRef.current = playlistState;
  });

  useEffect(() => {
    setFilteredPlaylistState(playlistState);
  }, [playlistState]);

  useEffect(() => {
    if (prevPlaylistStateValue !== playlistState) {
      persistentStorage.set(PLAYLIST_PERSISTENT_KEY, playlistState);
    }
  }, [playlistState, prevPlaylistStateValue]);

  return (
    <GlobalStateContext.Provider
      value={{
        addToPlaylistState,
        playlistState: filteredPlaylistState,
        removeFromPlaylistState,
        filterPlaylistState,
        removeFilterOnPlaylistState
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// !TODO: split global state adapter to each case
export class GlobalStateAdapter
  implements
    AddToPlaylistGlobalState,
    GetPlaylistFromGlobalState,
    RemoveFromPlaylistGlobalState,
    FilterPlaylistOnGlobalState,
    RemoveFilterOnPlaylistOnGlobalState
{
  constructor(
    private readonly params?: {
      addToPlaylistState?: (value: Video) => void;
      removeFromPlaylistState?: (id: string) => void;
      filterPlaylistState?: (pattern: string) => void;
      removeFilterOnPlaylistState?: () => void;
      playlistState?: Video[];
    }
  ) {}

  addToPlaylist(value: Video): void {
    this.params?.addToPlaylistState?.(value);
  }

  getPlaylist(): Video[] {
    return this.params?.playlistState || [];
  }

  removeFromPlaylist(id: string): void {
    this.params.removeFromPlaylistState(id);
  }

  filterPlaylist(pattern: string): void {
    this.params.filterPlaylistState(pattern);
  }

  removeFilterOnPlaylist(): void {
    this.params.removeFilterOnPlaylistState();
  }
}
