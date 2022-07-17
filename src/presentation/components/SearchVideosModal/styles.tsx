import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 90%;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.gray700};
  padding: 20px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 4px;
  height: 40px;
  font-weight: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.white};
  }
  background: transparent;
`;

export const ModalContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

export const LoadingContainer = styled.div`
  font-size: 24px;
`;

export const ErrorMessageContainer = styled.div`
  font-size: 24px;
`;
