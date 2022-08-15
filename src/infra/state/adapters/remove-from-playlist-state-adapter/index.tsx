import { useDispatch } from 'react-redux';
import { RemoveFromPlaylistState } from '@/data/protocols/state';
import { removeFromPlaylist } from '../../redux/slices/playlist';

export const useRemoveFromPlaylist = (): { removeFromPlaylist: RemoveFromPlaylistState } => {
  const dispatch = useDispatch();

  const removeFromPlaylistState = (id: string) => {
    dispatch(removeFromPlaylist({ id }));
  };

  return {
    removeFromPlaylist: removeFromPlaylistState
  };
};
