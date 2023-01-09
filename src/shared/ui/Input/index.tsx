import styled from "@emotion/styled";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

const StyledInput = styled.input`
  background: white;
  height: 35px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 5px;
  border: 1px solid black;
`;

const FormControl = styled.div``;

const FormLabel = styled.div`
  margin-top: 20px;
  color: black;
`;

interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label: string;
}

export const ControlledInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: InputProps<TFieldValues, TName>
) => {
  const { name, label } = props;
  const { field } = useController(props);
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <StyledInput
        {...field}
        placeholder={name}
      />
    </FormControl>
  );
};
