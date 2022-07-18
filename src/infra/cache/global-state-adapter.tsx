/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { AddToPlaylistGlobalState } from '@/data/protocols/cache/add-to-playlist-global-state';
import { GetPlaylistFromGlobalState } from '@/data/protocols/cache/get-playlist-from-global-state';
import { Video } from '@/domain/models/video-model';

type GlobalState = Record<string, any[]>;

type GlobalStateData = {
  addToPlaylistState(value: Video): void;
  playlistState: Set<Video>;
};

type GlobalStateProps = PropsWithChildren;

export const GlobalStateContext = createContext<GlobalStateData>({} as GlobalStateData);

export const useGlobalState = (): GlobalStateData => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: GlobalStateProps) {
  const [playlistState, setPlaylistState] = useState<Set<Video>>(new Set([]));

  const addToPlaylistState = (value: Video) => {
    setPlaylistState((prevValue) => prevValue.add(value));
  };

  return (
    <GlobalStateContext.Provider
      value={{
        addToPlaylistState,
        playlistState
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export class GlobalStateAdapter implements AddToPlaylistGlobalState, GetPlaylistFromGlobalState {
  constructor(
    private readonly params?: {
      addToPlaylistState?: (value: Video) => void;
      playlistState?: Set<Video>;
    }
  ) {}

  addToPlaylist(value: Video): void {
    this.params?.addToPlaylistState?.(value);
  }

  getPlaylist(): Set<Video> {
    return this.params?.playlistState || new Set([]);
  }
}
