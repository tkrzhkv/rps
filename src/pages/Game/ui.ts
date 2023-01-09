import styled from "@emotion/styled";
import { FieldValues } from "react-hook-form";

export const Container = styled.div`
  background-color: antiquewhite;
  position: relative;
  width: auto;
  padding-top: 100px;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const ResultContainer = styled.div`
  padding: 20px;
  border: 1px solid grey;
  text-align: center;
  margin-top: 20px;
`;

export const LeaveGameContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export interface FormValues extends FieldValues {
  username: string;
}
