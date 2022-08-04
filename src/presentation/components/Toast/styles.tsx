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
`;

export const CloseButton = styled.button`
  margin-left: 12px;
  display: none;

  svg {
    fill: ${({ theme }) => theme.colors.gray800};
    width: 32px;
    height: 32px;
    transition: all ease 0.5s;

    :hover {
      fill: ${({ theme }) => theme.colors.gray700};
    }
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

export const ToastContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 20px;

  div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 12px;

    @media (min-width: 768px) {
      margin: 0;
      width: unset;
    }
  }

  button {
    display: flex;
  }

  span {
    display: flex;
    font-size: 32px;
    margin-right: 12px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    button {
      display: none;
    }
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
