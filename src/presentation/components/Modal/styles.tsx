import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.3);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  z-index: 999;
`;
