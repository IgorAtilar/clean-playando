import { act } from 'react-dom/test-utils';
import { renderHook } from '@/utils/test';
import { GlobalStateAdapter, GlobalStateProvider, useGlobalState } from './global-state-adapter';
import { mockVideo } from '@/presentation/test/mock-video';

describe('Infra: GlobalStateAdapter', () => {
  it('should add videos on the GlobalState playlist', () => {
    const wrapper = ({ children }) => <GlobalStateProvider>{children}</GlobalStateProvider>;
    const { result } = renderHook(() => useGlobalState(), { wrapper });
    const { addToPlaylistState } = result.current;
    const globalStateAdapter = new GlobalStateAdapter({
      addToPlaylistState
    });

    const firstVideo = mockVideo();

    act(() => {
      globalStateAdapter.addToPlaylist(firstVideo);
    });

    expect(result.current.playlistState).toStrictEqual(new Set([firstVideo]));

    const secondVideo = mockVideo();

    act(() => {
      globalStateAdapter.addToPlaylist(secondVideo);
    });

    expect(result.current.playlistState).toStrictEqual(new Set([firstVideo, secondVideo]));
  });

  it('should return the playlist from GlobalState', () => {
    const wrapper = ({ children }) => <GlobalStateProvider>{children}</GlobalStateProvider>;
    const { result, rerender } = renderHook(() => useGlobalState(), { wrapper });
    const { addToPlaylistState, playlistState } = result.current;
    const globalStateAdapter = new GlobalStateAdapter({ addToPlaylistState, playlistState });

    const firstVideo = mockVideo();
    const secondVideo = mockVideo();

    act(() => {
      globalStateAdapter.addToPlaylist(firstVideo);
      globalStateAdapter.addToPlaylist(secondVideo);
    });

    rerender();

    expect(result.current.playlistState).toStrictEqual(new Set([firstVideo, secondVideo]));
  });
});
