import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.gray700};
  padding: 20px;

  @media (min-width: 768px) {
    width: 90%;
    height: 90%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray500};
  padding: 8px;
  margin-bottom: 16px;
`;

export const ModalCloseButton = styled.button`
  padding: 12px;
  border-radius: 4px;
  height: 40px;
  font-weight: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  background: transparent;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.white};
  }
`;

export const InfoContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SearchVideoDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow-x: hidden;
  gap: 8px;
`;

export const LoadingContainer = styled.div`
  font-size: 24px;
`;

export const ErrorMessageContainer = styled.div`
  font-size: 24px;
`;
