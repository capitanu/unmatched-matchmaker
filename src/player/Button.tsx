import styled from "styled-components";

export const ButtonPlayer = styled.button`
  background-color: #3f3f3f;
  color: white;
  padding: 20px 30px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => props.theme};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export const ButtonConfirm = styled.button`
  background-color: #13ef13;
  color: white;
  padding: 20px 30px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => props.theme};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export const ButtonRestartSeason = styled.button`
  background-color: #ef1313;
  color: white;
  padding: 20px 30px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => props.theme};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

