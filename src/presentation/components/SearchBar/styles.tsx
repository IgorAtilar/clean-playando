import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;

  input {
    margin-bottom: 12px;
    @media (min-width: 768px) {
      margin: 0;
      width: 72%;
    }
  }

  button {
    @media (min-width: 768px) {
      width: 24%;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
