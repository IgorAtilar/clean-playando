import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.gray400};

    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
