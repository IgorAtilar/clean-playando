/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { Video } from '@/domain/models/video-model';
import { SaveVideoResponse } from '@/domain/usecases/save-video';
import {
  AddToPlaylistGlobalState,
  GetPlaylistFromGlobalState,
  FilterPlaylistOnGlobalState,
  RemoveFromPlaylistGlobalState,
  RemoveFilterOnPlaylistOnGlobalState,
  GetSearchCacheOnGlobalState,
  AddSearchCacheOnGlobalState
} from '@/data/protocols/cache/global-state';

export type SearchCacheState = Record<string, Video[]>;

type GlobalStateData = {
  addToSearchCacheState(search: string, videos: Video[]): void;
  searchCacheState: SearchCacheState;
  addToPlaylistState(value: Video): SaveVideoResponse;
  removeFromPlaylistState(id: string): void;
  filterPlaylistState(pattern: string): void;
  removeFilterOnPlaylistState(): void;
  playlistState: Video[];
};

type GlobalStateProps = PropsWithChildren & {
  playlistOnStorage?: Video[];
};

export const GlobalStateContext = createContext<GlobalStateData>({} as GlobalStateData);

export const useGlobalState = (): GlobalStateData => useContext(GlobalStateContext);

export function GlobalStateProvider({ children, playlistOnStorage = [] }: GlobalStateProps) {
  const playlistStateRef = useRef<Video[]>();
  const [playlistState, setPlaylistState] = useState<Video[]>(playlistOnStorage);
  const [filteredPlaylistState, setFilteredPlaylistState] = useState<Video[]>(playlistState);
  const [searchCacheState, setSearchCacheState] = useState<SearchCacheState>({});

  const addToPlaylistState = (video: Video): SaveVideoResponse => {
    if (playlistState.find((value) => value.id === video.id))
      return {
        errorMessage: 'Oops! Esse vídeo já está adicionado na sua playlist.'
      };

    setPlaylistState((prevVideos) => [...prevVideos, video]);

    return {
      success: 'Vídeo adicionado com sucesso :D'
    };
  };

  const addToSearchCacheState = (search: string, videos: Video[]) => {
    setSearchCacheState((prevValue) => ({
      ...prevValue,
      [search]: videos
    }));
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

    setFilteredPlaylistState(playlistState);
  }, [playlistState]);

  return (
    <GlobalStateContext.Provider
      value={{
        addToPlaylistState,
        playlistState: filteredPlaylistState,
        removeFromPlaylistState,
        filterPlaylistState,
        removeFilterOnPlaylistState,
        addToSearchCacheState,
        searchCacheState
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export class GlobalStateAdapter
  implements
    AddToPlaylistGlobalState,
    GetPlaylistFromGlobalState,
    RemoveFromPlaylistGlobalState,
    FilterPlaylistOnGlobalState,
    RemoveFilterOnPlaylistOnGlobalState,
    GetSearchCacheOnGlobalState,
    AddSearchCacheOnGlobalState
{
  constructor(
    private readonly params?: {
      addToPlaylistState?: (value: Video) => SaveVideoResponse;
      removeFromPlaylistState?: (id: string) => void;
      filterPlaylistState?: (pattern: string) => void;
      removeFilterOnPlaylistState?: () => void;
      addToSearchCacheState?: (search: string, videos: Video[]) => void;
      searchCacheState?: SearchCacheState;
      playlistState?: Video[];
    }
  ) {}

  addToSearchCache(search: string, videos: Video[]): void {
    this.params.addToSearchCacheState(search, videos);
  }

  getSearchCacheOnGlobalState(search: string): Video[] {
    return this.params.searchCacheState[search] || [];
  }

  addToPlaylist(value: Video): SaveVideoResponse {
    return this.params?.addToPlaylistState?.(value);
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
