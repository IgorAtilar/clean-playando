import { ButtonHTMLAttributes } from 'react';
import { DefaultTheme, StyledComponent } from 'styled-components';

import { PrimaryButton, SecondaryButton } from './styles';

export type ButtonColorScheme = 'primary' | 'secondary';

const mapColorSchemeToButton: Record<
  ButtonColorScheme,
  StyledComponent<'button', DefaultTheme, {}, never>
> = {
  primary: PrimaryButton,
  secondary: SecondaryButton
};

const getButtonByColorScheme = (colorScheme: ButtonColorScheme = 'primary') =>
  mapColorSchemeToButton[colorScheme];

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as'> & {
  colorScheme?: ButtonColorScheme;
};

export function Button({ colorScheme, children, ...htmlProps }: ButtonProps) {
  const StyledButton = getButtonByColorScheme(colorScheme);

  return <StyledButton {...htmlProps}>{children}</StyledButton>;
}
