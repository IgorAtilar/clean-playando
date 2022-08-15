import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '@/domain/models/video-model';
import { RootState } from '../../store';

export type SearchCacheSliceState = {
  searchs: Record<string, Video[]>;
};

const initialState: SearchCacheSliceState = {
  searchs: {}
};

export const searchCacheSlice = createSlice({
  name: 'searchCache',
  initialState,
  reducers: {
    addToSearchCache: (
      state: SearchCacheSliceState,
      action: PayloadAction<{ search: string; result: Video[] }>
    ) => ({
      ...state,
      searchs: {
        ...state.searchs,
        [action.payload.search]: action.payload.result
      }
    })
  }
});

export const selectSearchCache = (state: RootState) => state.searchCache.searchs;

export const { addToSearchCache } = searchCacheSlice.actions;

export const searchCacheReducer = searchCacheSlice.reducer;
