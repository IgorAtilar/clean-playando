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
  border: none;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.white};
  }
`;

export const PrimaryButton = styled.button`
  ${baseButtonStyles}
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

export const SecondaryButton = styled.button`
  ${baseButtonStyles}
  background: ${({ theme }) => theme.colors.gray400};
  color: ${({ theme }) => theme.colors.gray900};
`;
