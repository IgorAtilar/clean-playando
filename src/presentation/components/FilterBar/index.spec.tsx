import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/test';
import { FilterBar, FilterBarProps } from '.';

describe('Presentation: Components/FilterBar', () => {
  const defaultProps: FilterBarProps = {
    placeholder: 'placeholder-test',
    onFilter: () => {},
    onClearFilter: () => {},
    type: 'filter'
  };

  it('should show the button with the text "Filtrar" if filterBarType is "filter"', () => {
    const { rerender } = render(<FilterBar {...defaultProps} type="filter" />);
    const firstButton = screen.getByRole('button', { name: 'Filtrar' });
    expect(firstButton).toBeInTheDocument();
    rerender(<FilterBar {...defaultProps} />);
    const secondButton = screen.getByRole('button', { name: 'Filtrar' });
    expect(secondButton).toBeInTheDocument();
  });

  it('should show the button with the text "Limpar filtro" if filterBarType is "clear"', () => {
    render(<FilterBar {...defaultProps} type="clear" />);
    const button = screen.getByRole('button', { name: 'Limpar filtro' });
    expect(button).toBeInTheDocument();
  });

  describe('actions', () => {
    it('should call onFilter with the correct value when user click on filter button', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      const text = faker.lorem.words();
      render(<FilterBar {...defaultProps} onFilter={handler} />);
      const input = screen.getByPlaceholderText(defaultProps.placeholder);
      const button = screen.getByRole('button');
      await user.type(input, text);
      await user.click(button);
      expect(handler).toHaveBeenCalledWith(text);
    });

    it('should call onFilter callback when pressing enter on FilterBar input', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      const text = faker.lorem.words();
      render(<FilterBar {...defaultProps} onFilter={handler} />);
      const input = screen.getByPlaceholderText(defaultProps.placeholder);
      await user.type(input, `${text}{enter}`);
      expect(handler).toHaveBeenCalledWith(text);
    });

    it('should call onClearFilter callback when filterBarType is "clear" and the clear button is pressed', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      render(<FilterBar {...defaultProps} onClearFilter={handler} type="clear" />);
      const button = screen.getByRole('button', { name: 'Limpar filtro' });
      await user.click(button);
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
