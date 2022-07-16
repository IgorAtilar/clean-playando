import { SearchBar } from '@/presentation/components/SearchBar';
import { Container } from './styles';

export function Home() {
  return (
    <Container>
      <SearchBar
        placeholder="Insira o link ou título do vídeo"
        onSubmit={(value) => console.log(value)}
        searchBarType="add"
      />
    </Container>
  );
}
