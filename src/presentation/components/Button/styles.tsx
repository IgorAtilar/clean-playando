import styled, { css } from 'styled-components';

const baseButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  font-weight: ${({ theme }) => theme.fonts.bold};
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
