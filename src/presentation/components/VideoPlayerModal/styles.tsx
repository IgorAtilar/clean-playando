import styled from 'styled-components';

export const ControlsContainer = styled.div`
  display: none;

  position: absolute;
  width: 100%;
  bottom: 0;
  align-items: center;
  gap: 0 8px;
  padding: 12px;
`;

export const PlayerContainer = styled.div`
  position: relative;
  height: 80%;
  width: 90%;

  :hover {
    ${ControlsContainer} {
      display: flex;
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
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 12px;
  right: 12px;

  svg {
    width: 24px;
    fill: ${({ theme }) => theme.colors.gray100};
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
