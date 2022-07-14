import { InputHTMLAttributes } from 'react';

import { StyledInput } from './styles';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'as'>;

export function Input({ ...htmlProps }: InputProps) {
  return <StyledInput {...htmlProps} />;
}
