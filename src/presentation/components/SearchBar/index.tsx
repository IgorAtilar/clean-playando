import { ChangeEvent, FormEvent, useRef } from 'react';
import { Button, Input } from '@/presentation/components';

import { Container } from './styles';

export type SearchBarType = 'add' | 'search';

export type SearchBarProps = {
  onSearch: (value: string) => void;
  onInputChange: (value: string) => void;
  onAdd: (videoUrl: string) => void;
  placeholder?: string;
  searchBarType?: SearchBarType;
  className?: string;
};

export const mapSearchBarTypeToButtonText: Record<SearchBarType, string> = {
  add: 'Adicionar',
  search: 'Buscar'
};

export function SearchBar({
  onSearch,
  onInputChange,
  onAdd,
  placeholder = '',
  searchBarType = 'search',
  className
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>();

  const handleSearch = () => {
    const { value } = inputRef.current;
    onSearch(value);
    inputRef.current.value = '';
    return inputRef.current.blur();
  };

  const handleAdd = () => {
    const { value } = inputRef.current;
    onAdd(value);
    inputRef.current.value = '';
    return inputRef.current.blur();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchBarType === 'add') return handleAdd();
    const { value } = inputRef.current;
    onSearch(value);
    inputRef.current.value = '';
    return inputRef.current.blur();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <Container className={className}>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          onChange={handleInputChange}
          name="search"
          placeholder={placeholder}
        />
      </form>
      {searchBarType === 'search' ? (
        <Button type="button" onClick={handleSearch}>
          {mapSearchBarTypeToButtonText[searchBarType]}
        </Button>
      ) : (
        <Button type="button" onClick={handleAdd}>
          {mapSearchBarTypeToButtonText[searchBarType]}
        </Button>
      )}
    </Container>
  );
}
