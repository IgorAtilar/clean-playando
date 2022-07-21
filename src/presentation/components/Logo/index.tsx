import { Container } from './styles';

export type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Container className={className}>
      <h1>Clean Playando</h1>
    </Container>
  );
}
