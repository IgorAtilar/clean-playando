import { Container } from './styles';

export type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return <Container className={className}>Clean Playando</Container>;
}
