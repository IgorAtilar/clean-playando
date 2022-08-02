import { ChangeEvent, FormEvent, useRef } from 'react';
import { Button, Input } from '@/presentation/components';

import { Container } from './styles';

export type SearchBarType = 'add' | 'search';

export type SearchBarProps = {
  onSubmit: (value: string) => void;
  onInputChange: (value: string) => void;
  placeholder?: string;
  type: SearchBarType;
  className?: string;
};

export const mapSearchBarTypeToButtonText: Record<SearchBarType, string> = {
  add: 'Adicionar',
  search: 'Buscar'
};

export function SearchBar({
  onSubmit,
  onInputChange,
  placeholder = '',
  type,
  className
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { value } = inputRef.current;
    onSubmit(value);
    inputRef.current.value = '';
    return inputRef.current.blur();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <Container onSubmit={handleSubmit} className={className}>
      <Input ref={inputRef} onChange={handleInputChange} name="search" placeholder={placeholder} />
      <Button type="submit">{mapSearchBarTypeToButtonText[type]}</Button>
    </Container>
  );
}
