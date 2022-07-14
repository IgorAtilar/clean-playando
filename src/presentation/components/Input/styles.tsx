import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  border-radius: 4px;
  padding: 12px;
  height: 32px;
  caret-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.background};
  :focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
