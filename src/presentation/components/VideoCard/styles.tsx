import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 320px;

  h3 {
    margin-top: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  strong {
    margin: 8px 0px;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export const ThumbnailImage = styled.img`
  width: 320px;
  height: auto;
  border-radius: 4px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  width: 60px;
  padding: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.error};

  svg {
    width: 16px;
    height: 16px;
  }
`;
