import { Container } from './styles';

export type EmptyStateProps = {
  text: string;
  className?: string;
};

export function EmptyState({ text, className }: EmptyStateProps) {
  return <Container className={className}>{text}</Container>;
}
