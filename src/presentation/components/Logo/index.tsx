import { LogoImage } from './styles';

export type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return <LogoImage className={className} src="./assets/logo-expanded.svg" alt="logo" />;
}
