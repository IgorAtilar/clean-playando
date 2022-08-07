import styled, { keyframes, css } from 'styled-components';

export const toastAnimation = keyframes`
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateX(0);
    }
`;

const baseToastContainerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 96%;
  min-height: 80px;
  animation: ${toastAnimation} ease 0.5s;
  position: absolute;
  bottom: 16px;
  border-radius: 8px;
  padding: 12px;
  pointer-events: all;
  cursor: pointer;
`;

export const ToastContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }

  span {
    display: flex;
    font-size: 32px;
    margin-right: 12px;
  }
`;

export const ToastSuccessContainer = styled.div`
  ${baseToastContainerStyles}
  background: ${({ theme }) => theme.colors.success};
`;

export const ToastErrorContainer = styled.div`
  ${baseToastContainerStyles}
  background: ${({ theme }) => theme.colors.error};
`;

export const ToastWarningContainer = styled.div`
  ${baseToastContainerStyles}
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.gray800};
`;
