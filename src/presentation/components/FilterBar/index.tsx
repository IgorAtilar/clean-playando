import { FormEvent, FormHTMLAttributes } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Form } from './styles';

export type FilterBarType = 'filter' | 'clear';

export type FilterBarProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  filterBarType?: FilterBarType;
  onSubmit: (value: string) => void;
  placeholder?: string;
};

type FilterBarElements = HTMLFormControlsCollection & {
  filter: {
    value: string;
  };
};

export const mapFilterBarTypeToText: Record<FilterBarType, string> = {
  filter: 'Filtrar',
  clear: 'Limpar filtro'
};

export const getButtonText = (type?: FilterBarType) =>
  type ? mapFilterBarTypeToText[type] : mapFilterBarTypeToText.filter;

export function FilterBar({ filterBarType, onSubmit, placeholder, ...htmlProps }: FilterBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      filter: { value }
    } = e.currentTarget.elements as FilterBarElements;
    onSubmit(value);
  };

  return (
    <Form {...htmlProps} onSubmit={handleSubmit}>
      <Input name="filter" placeholder={placeholder} />
      <Button type="submit" colorScheme="secondary">
        {getButtonText(filterBarType)}
      </Button>
    </Form>
  );
}
