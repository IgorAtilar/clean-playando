import styled from 'styled-components';
import {
  Logo as BaseLogo,
  SearchBar as BaseSearchBar,
  FilterBar as BaseFilterBar
} from '@/presentation/components';

export const MAIN_CONTAINER_OVERFLOW = '--main-container-overflow';
export const MAIN_CONTAINER_POSITION = '--main-container-position';

export const Container = styled.main`
  width: 100%;
  padding: 20px;
  overflow: var(${MAIN_CONTAINER_OVERFLOW});
  position: var(${MAIN_CONTAINER_POSITION});
`;

export const Logo = styled(BaseLogo)`
  margin-bottom: 20px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const SearchBar = styled(BaseSearchBar)`
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray500};
`;

export const FilterBar = styled(BaseFilterBar)`
  margin-top: 12px;
  margin-bottom: 32px;
`;

export const PlaylistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 340px);
  gap: 24px;
  justify-content: space-around;
`;
