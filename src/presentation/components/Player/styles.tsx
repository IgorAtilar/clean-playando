import styled from 'styled-components';

export const PLAYER_HEIGHT = '--player-height';
export const PLAYER_WIDTH = '--player-width';

export const YoutuberPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 10px;
  background: ${({ theme }) => theme.colors.gray700};
  border-radius: 4px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -24px;

  button {
    width: 28%;
  }
`;
