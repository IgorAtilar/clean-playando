import styled from 'styled-components';

export const IMAGE_HEIGHT_DEFAULT = '--image-height-default';
export const IMAGE_WIDTH_DEFAULT = '--image-width-default';
export const IMAGE_HEIGHT_MEDIUM = '--image-height-medium';
export const IMAGE_WIDTH_MEDIUM = '--image-width-medium';
export const IMAGE_URL_DEFAULT = '--image-url-default';
export const IMAGE_URL_MEDIUM = '--image-url-medium';

export const SearchVideoDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 12px;
  background: ${({ theme }) => theme.colors.gray800};
  border-radius: 4px;
`;

export const Image = styled.img`
  height: var(${IMAGE_HEIGHT_DEFAULT});
  width: var(${IMAGE_WIDTH_DEFAULT});
  border: 2px solid ${({ theme }) => theme.colors.gray500};
  content: var(${IMAGE_URL_DEFAULT});

  @media (min-width: 768px) {
    height: var(${IMAGE_HEIGHT_MEDIUM});
    width: var(${IMAGE_WIDTH_MEDIUM});
    content: var(${IMAGE_URL_MEDIUM});
  }
`;

export const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;

  button {
    max-width: 160px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 68%;
  gap: 8px;

  strong {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
  }

  span:first-of-type {
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fonts.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;
