import styled from 'styled-components';

export const ControlsContainer = styled.div`
  display: flex;

  position: absolute;
  width: 100%;
  bottom: 0;
  align-items: center;
  gap: 0 8px;
  padding: 12px;

  @media (min-width: 992px) {
    display: none;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  right: 20px;

  svg {
    width: 24px;
    fill: ${({ theme }) => theme.colors.gray100};
    transition: all ease 0.5s;
  }

  :hover {
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

export const PlayerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  @media (orientation: portrait) {
    position: fixed;
    width: 100vh;
    height: 100vw;
    transform: rotate(90deg);
  }

  @media (min-width: 768px) {
    height: 80%;
    width: 90%;

    :hover {
      ${ControlsContainer} {
        display: flex;
      }

      ${CloseButton} {
        display: flex;
      }
    }
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    fill: ${({ theme }) => theme.colors.gray100};
    transition: all ease 0.5s;
  }

  :hover {
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const ProgressBar = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  background: ${({ theme }) => theme.colors.gray700};
  height: 8px;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  :focus {
    outline: none;
  }

  ::-ms-track {
    width: 100%;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 100%;
    width: 0;
    box-shadow: -1000px 0 0 1000px ${({ theme }) => theme.colors.primary};
  }

  ::-moz-range-thumb {
    height: 100%;
    width: 0;
    box-shadow: -1000px 0 0 1000px ${({ theme }) => theme.colors.primary};
  }

  ::-ms-thumb {
    height: 100%;
    width: 0;
    box-shadow: -1000px 0 0 1000px ${({ theme }) => theme.colors.primary};
  }
`;

export const VolumeBar = styled.input`
  -webkit-appearance: none;
  background: transparent;
  background: ${({ theme }) => theme.colors.gray700};
  height: 8px;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  :focus {
    outline: none;
  }

  ::-ms-track {
    width: 100%;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 100%;
    width: 0;
    box-shadow: -1000px 0 0 1000px ${({ theme }) => theme.colors.primary};
  }

  ::-moz-range-thumb {
    -webkit-appearance: none;
    height: 100%;
    width: 0;
    box-shadow: -1000px 0 0 1000px ${({ theme }) => theme.colors.primary};
  }

  ::-ms-thumb {
    -webkit-appearance: none;
    height: 100%;
    width: 0;
    box-shadow: -1000px 0 0 1000px ${({ theme }) => theme.colors.primary};
  }
`;
