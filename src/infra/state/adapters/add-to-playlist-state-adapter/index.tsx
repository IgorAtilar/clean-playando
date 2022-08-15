import { useDispatch, useSelector } from 'react-redux';
import { Video } from '@/domain/models/video-model';
import { addToPlaylist, selectPlaylist } from '../../redux/slices/playlist';
import { SaveVideoResponse } from '@/domain/usecases/save-video';
import { AddToPlaylistState } from '@/data/protocols/state';

export const useAddToPlaylist = (): { addToPlaylist: AddToPlaylistState } => {
  const playlistState = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  const addToPlaylistState = (video: Video): SaveVideoResponse => {
    if (playlistState.find((value) => value.id === video.id))
      return {
        errorMessage: 'Oops! Esse vídeo já está adicionado na sua playlist.'
      };

    dispatch(addToPlaylist(video));

    return {
      success: 'Vídeo adicionado com sucesso :D'
    };
  };

  return {
    addToPlaylist: addToPlaylistState
  };
};
