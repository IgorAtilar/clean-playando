import styled, { css } from 'styled-components';

const baseButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  font-weight: ${({ theme }) => theme.fonts.bold};
  border: 1px solid transparent;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }
`;

export const PrimaryButton = styled.button`
  ${baseButtonStyles}
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  transition: background ease 0.5s;

  :hover {
    background: #6b46c1;
  }
`;

export const SecondaryButton = styled.button`
  ${baseButtonStyles}
  background: ${({ theme }) => theme.colors.gray400};
  color: ${({ theme }) => theme.colors.gray900};
  transition: background ease 0.5s;

  :hover {
    background: ${({ theme }) => theme.colors.gray500};
  }
`;
