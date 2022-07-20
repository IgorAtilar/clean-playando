import { ChangeEvent, useRef } from 'react';
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

  const handleSubmit = () => {
    const { value } = inputRef.current;
    onSearch(value);
    inputRef.current.value = '';
    inputRef.current.blur();
  };

  const handleAdd = () => {
    const { value } = inputRef.current;
    onAdd(value);
    inputRef.current.value = '';
    inputRef.current.blur();
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
        <Button type="button" onClick={handleSubmit}>
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
