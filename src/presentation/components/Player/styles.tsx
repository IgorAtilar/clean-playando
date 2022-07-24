import styled from 'styled-components';

export const IMAGE_HEIGHT = '--image-height';
export const IMAGE_WIDTH = '--image-width';
export const IMAGE_URL = '--image-url';

export const YoutuberPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;

  padding: 12px;
  background: ${({ theme }) => theme.colors.gray700};
  border-radius: 4px;

  h3 {
    margin-top: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -24px;
`;

export const Image = styled.img`
  height: var(${IMAGE_HEIGHT});
  width: var(${IMAGE_WIDTH});
  content: var(${IMAGE_URL});
`;

export const Icon = styled.img`
  width: 50px;
  background: ${({ theme }) => theme.colors.gray800};
  border-radius: 50%;
  padding: 8px;
  transition: background ease 0.5s;

  :hover {
    background: ${({ theme }) => theme.colors.gray700};
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
`;
