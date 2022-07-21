import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  button {
    @media (min-width: 768px) {
      width: 24%;
    }
  }

  form {
    width: 100%;
    margin-bottom: 12px;

    @media (min-width: 768px) {
      margin: 0;
      width: 72%;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
