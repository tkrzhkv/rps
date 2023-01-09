import styled from '@emotion/styled';
import type { FC, ReactNode } from 'react';

export interface FormControlWrapperProps {
  children: ReactNode;
  label?: string;
}

const FormControl = styled.div`
  padding: 10px;
`;

const FormLabel = styled.div`
  margin-top: 10px;
  color: white;
`;

export const FormControlWrapper: FC<FormControlWrapperProps> = ({ label, children }) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
    </FormControl>
  );
};
