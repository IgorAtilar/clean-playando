import { Button } from '@/presentation/components/Button';
import { Input } from '@/presentation/components/Input';
import { Container } from './styles';

export function Home() {
  return (
    <Container>
      <Input />
      <Button colorScheme="secondary">Hello there</Button>
    </Container>
  );
}
