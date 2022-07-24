import { faker } from '@faker-js/faker';
import { render, screen } from '@/utils/test';
import { EmptyState } from '.';

describe('Presentation: Components/EmptyState', () => {
  it('should render the text passed by text prop correctly', () => {
    const text = faker.lorem.words();
    render(<EmptyState text={text} />);
    const textComponent = screen.getByText(text);
    expect(textComponent).toBeInTheDocument();
  });
});
