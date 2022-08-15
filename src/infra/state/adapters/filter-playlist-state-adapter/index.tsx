import { useDispatch } from 'react-redux';
import { FilterPlaylistOnState } from '@/data/protocols/state';
import { filterPlaylist } from '../../redux/slices/playlist';

export const useFilterPlaylist = (): {
  filterPlaylist: FilterPlaylistOnState;
} => {
  const dispatch = useDispatch();

  const filterPlaylistState = (pattern: string) => {
    dispatch(filterPlaylist({ pattern }));
  };

  return {
    filterPlaylist: filterPlaylistState
  };
};
