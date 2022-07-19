import styled from 'styled-components';
import { Logo as BaseLogo, SearchBar as BaseSearchBar } from '@/presentation/components';

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

export const PlaylistContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
`;
