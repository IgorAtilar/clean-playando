import styled from 'styled-components';
import {
  Logo as BaseLogo,
  SearchBar as BaseSearchBar,
  FilterBar as BaseFilterBar
} from '@/presentation/components';

export const Container = styled.main`
  width: 100%;
  padding: 20px;
`;

export const Logo = styled(BaseLogo)`
  margin-bottom: 20px;
`;

export const SearchBar = styled(BaseSearchBar)`
  margin-bottom: 32px;
`;

export const FilterBar = styled(BaseFilterBar)`
  margin-bottom: 32px;
`;

export const PlaylistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 340px);
  gap: 24px;
  justify-content: space-around;
`;
