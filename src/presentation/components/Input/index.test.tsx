import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '.';

describe('Presentation: Components/Input', () => {
  it('should allow user to type', async () => {
    const user = userEvent.setup();
    const placeholder = 'placeholder-text';
    const text = 'some-text';
    render(<Input placeholder={placeholder} />);
    const input = screen.getByPlaceholderText(placeholder);
    await user.type(input, text);

    expect(input).toHaveValue(text);
  });
});
