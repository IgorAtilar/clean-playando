import { useSelector } from 'react-redux';
import { GetPlaylistFromState } from '@/data/protocols/state';
import { selectPlaylist } from '../../redux/slices/playlist';

export const useGetPlaylist = (): { getPlaylist: GetPlaylistFromState } => {
  const playlistState = useSelector(selectPlaylist);

  const getPlaylist = () => playlistState;

  return {
    getPlaylist
  };
};
