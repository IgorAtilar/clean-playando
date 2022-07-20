/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { AddToPlaylistGlobalState } from '@/data/protocols/cache/add-to-playlist-global-state';
import { GetPlaylistFromGlobalState } from '@/data/protocols/cache/get-playlist-from-global-state';
import { FilterPlaylistOnGlobalState } from '@/data/protocols/cache/filter-playlist-on-global-state';
import { RemoveFromPlaylistGlobalState } from '@/data/protocols/cache/remove-from-playlist-global-state';
import { Video } from '@/domain/models/video-model';

type GlobalStateData = {
  addToPlaylistState(value: Video): void;
  removeFromPlaylistState(id: string): void;
  filterPlaylistState(pattern: string): void;
  playlistState: Video[];
};

type GlobalStateProps = PropsWithChildren;

export const GlobalStateContext = createContext<GlobalStateData>({} as GlobalStateData);

export const useGlobalState = (): GlobalStateData => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: GlobalStateProps) {
  const [playlistState, setPlaylistState] = useState<Video[]>([]);
  const [filteredPlaylistState, setFilteredPlaylistState] = useState<Video[]>(playlistState);

  const addToPlaylistState = (video: Video) => {
    if (playlistState.find((value) => value.id === video.id)) return;

    setPlaylistState((prevVideos) => [...prevVideos, video]);
  };

  const removeFromPlaylistState = (id: string) => {
    setPlaylistState((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  const filterPlaylistState = (pattern: string) => {
    const searchArray = pattern.toLowerCase().split(' ');
    setFilteredPlaylistState((prevFilteredPlaylist) => [
      ...prevFilteredPlaylist.filter((video) =>
        searchArray.every((word) => video.title.toLowerCase().includes(word))
      )
    ]);
  };

  useEffect(() => {
    setFilteredPlaylistState(playlistState);
  }, [playlistState]);

  return (
    <GlobalStateContext.Provider
      value={{
        addToPlaylistState,
        playlistState: filteredPlaylistState,
        removeFromPlaylistState,
        filterPlaylistState
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
    FilterPlaylistOnGlobalState
{
  constructor(
    private readonly params?: {
      addToPlaylistState?: (value: Video) => void;
      removeFromPlaylistState?: (id: string) => void;
      filterPlaylistState?: (pattern: string) => void;
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
}
