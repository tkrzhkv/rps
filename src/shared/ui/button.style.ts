import styled from "@emotion/styled";

export interface IButton {
  isActive?: boolean;
  onClick?: VoidFunction;
}

export const Button = styled.button<IButton>`
  align-items: center;
  height: 30px;
  margin-top: 15px;
  width: 100%;
  padding: 6px 10px;
  border-radius: 10px;
  margin-right: 15px;
  color: white;
  vertical-align: baseline;
  &:hover {
    cursor: pointer;
    background-color: darkblue;
  }

  background-color: ${(props) => (props.isActive ? "orange" : "green")};
`;
