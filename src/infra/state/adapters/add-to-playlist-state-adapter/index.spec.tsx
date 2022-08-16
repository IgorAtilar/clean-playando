import { act } from 'react-dom/test-utils';
import { AllTheProviders, configureTestStore, renderHook } from '@/utils/test';
import { addToPlaylist } from '@/infra/state/redux/slices/playlist';
import { mockVideo } from '@/presentation/test/mock-video';
import { useAddToPlaylist } from '.';

describe('Infra: State/Adapters/useAddToPlaylist', () => {
  it('should dispatch the addToPlaylist action with the correct params and return the success message', () => {
    const video = mockVideo();

    const store = configureTestStore();

    const wrapper = ({ children }) => <AllTheProviders store={store}>{children}</AllTheProviders>;
    const { result } = renderHook(() => useAddToPlaylist(), { wrapper });
    const {
      current: { addToPlaylist: addToPlaylistHook }
    } = result;

    act(() => {
      const response = addToPlaylistHook(video);
      expect(store.dispatch).toHaveBeenCalledWith(addToPlaylist(video));
      expect(response).toStrictEqual({
        success: 'Vídeo adicionado com sucesso :D'
      });
    });
  });

  it('should return the error message when try to add the same video twice', () => {
    const video = mockVideo();

    const store = configureTestStore({
      playlist: {
        videos: [video],
        filteredVideos: [video]
      },
      searchCache: {
        searchs: {}
      }
    });

    const wrapper = ({ children }) => <AllTheProviders store={store}>{children}</AllTheProviders>;
    const { result } = renderHook(() => useAddToPlaylist(), { wrapper });
    const {
      current: { addToPlaylist: addToPlaylistHook }
    } = result;

    act(() => {
      const response = addToPlaylistHook(video);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
      expect(response).toStrictEqual({
        errorMessage: 'Oops! Esse vídeo já está adicionado na sua playlist.'
      });
    });
  });
});
