/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { AddToPlaylistGlobalState } from '@/data/protocols/cache/add-to-playlist-global-state';
import { GetPlaylistFromGlobalState } from '@/data/protocols/cache/get-playlist-from-global-state';
import { Video } from '@/domain/models/video-model';
import { RemoveFromPlaylistGlobalState } from '@/data/protocols/cache/remove-from-playlist-global-state';

type GlobalStateData = {
  addToPlaylistState(value: Video): void;
  removeFromPlaylistState(id: string): void;
  playlistState: Video[];
};

type GlobalStateProps = PropsWithChildren;

export const GlobalStateContext = createContext<GlobalStateData>({} as GlobalStateData);

export const useGlobalState = (): GlobalStateData => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: GlobalStateProps) {
  const [playlistState, setPlaylistState] = useState<Video[]>([]);

  const addToPlaylistState = (video: Video) => {
    if (playlistState.find((value) => value.id === video.id)) return;

    setPlaylistState((prevVideos) => [...prevVideos, video]);
  };

  const removeFromPlaylistState = (id: string) => {
    setPlaylistState((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  return (
    <GlobalStateContext.Provider
      value={{
        addToPlaylistState,
        playlistState,
        removeFromPlaylistState
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export class GlobalStateAdapter
  implements AddToPlaylistGlobalState, GetPlaylistFromGlobalState, RemoveFromPlaylistGlobalState
{
  constructor(
    private readonly params?: {
      addToPlaylistState?: (value: Video) => void;
      removeFromPlaylistState?: (id: string) => void;
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
}
