import styled from 'styled-components';

export const SearchVideoDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: 12px;
  background: ${({ theme }) => theme.colors.gray800};
  border-radius: 4px;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Image = styled.img`
  border: 2px solid ${({ theme }) => theme.colors.gray500};
  height: 180px;
  width: 320px;
`;

export const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
  gap: 16px;

  button {
    @media (min-width: 768px) {
      max-width: 160px;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  strong {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

  @media (min-width: 768px) {
    width: 68%;
  }
`;
