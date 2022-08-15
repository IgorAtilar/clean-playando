import { useDispatch } from 'react-redux';
import { RemoveFilterOnPlaylistState } from '@/data/protocols/state';
import { removeFilterFromPlaylist } from '../../redux/slices/playlist';

export const useRemoveFilterFromPlaylist = (): {
  removeFilterOnPlaylist: RemoveFilterOnPlaylistState;
} => {
  const dispatch = useDispatch();

  const removeFilterOnPlaylistState = () => {
    dispatch(removeFilterFromPlaylist());
  };

  return {
    removeFilterOnPlaylist: removeFilterOnPlaylistState
  };
};
