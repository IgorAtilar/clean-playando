import { SearchVideos } from '@/domain/usecases/search-videos';
import { SearchBar } from '@/presentation/components';
import { Container, Logo } from './styles';

export type HomeProps = {
  searchVideos: SearchVideos;
};

export function Home({ searchVideos }: HomeProps) {
  const handleSubmit = async (value?: string) => {
    if (!value) return;

    const { videos } = await searchVideos.search({
      q: value,
      maxResults: 4
    });
  };

  return (
    <Container>
      <Logo />
      <SearchBar
        placeholder="Insira o link ou título do vídeo"
        onSubmit={handleSubmit}
        searchBarType="add"
      />
    </Container>
  );
}
