import styled, { keyframes, css } from 'styled-components';

export const toastAnimation = keyframes`
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateX(0);
    }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  z-index: 9999;
  pointer-events: none;
`;

const baseToastContainerStyles = css`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 80px;
  animation: ${toastAnimation} ease 0.5s;
  position: absolute;
  bottom: 16px;
  border-radius: 8px;
  padding: 12px;
  pointer-events: all;
`;

export const ToastBody = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;

  span {
    font-size: 32px;
    margin-right: 12px;
  }
`;

export const ToastHeader = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray100};
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
