import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  border-radius: 4px;
  padding: 12px 8px;
  height: 32px;
  caret-color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.gray700};
  color: ${({ theme }) => theme.colors.gray100};
  border: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  ::-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
