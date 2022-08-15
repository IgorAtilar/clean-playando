import { useDispatch } from 'react-redux';
import { AddToSearchCacheOnState } from '@/data/protocols/state';
import { Video } from '@/domain/models/video-model';
import { addToSearchCache } from '../../redux/slices/search-cache';

export const useAddToSearchCache = (): { addToSearchCache: AddToSearchCacheOnState } => {
  const dispatch = useDispatch();

  const addToSearchCacheState = (search: string, result: Video[]) => {
    dispatch(addToSearchCache({ search, result }));
  };

  return {
    addToSearchCache: addToSearchCacheState
  };
};
