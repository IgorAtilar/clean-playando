import { useSelector } from 'react-redux';
import { GetSearchCacheFromState } from '@/data/protocols/state';
import { selectSearchCache } from '../../redux/slices/search-cache';

export const useGetSearchCache = (): { getSearchCache: GetSearchCacheFromState } => {
  const searchCacheState = useSelector(selectSearchCache);

  const getSearchCache = (search: string) => searchCacheState[search] || [];

  return {
    getSearchCache
  };
};
