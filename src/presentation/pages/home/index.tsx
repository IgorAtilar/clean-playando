import { useState } from 'react';
import { SearchVideos } from '@/domain/usecases/search-videos';
import { SearchBar, SearchVideosModal } from '@/presentation/components';
import { Container, Logo } from './styles';
import { Video } from '@/domain/models/video-model';

export type HomeProps = {
  searchVideos: SearchVideos;
};

export function Home({ searchVideos }: HomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [videos, setVideos] = useState<Video[]>();

  const handleSubmit = async (value?: string) => {
    if (!value) return;
    setIsOpen(true);

    const { videos, errorMessage } = await searchVideos.search({
      q: value,
      maxResults: 4
    });
    setVideos(videos);
    setErrorMessage(errorMessage);
  };

  return (
    <Container>
      <Logo />
      <SearchBar
        placeholder="Insira o link ou título do vídeo"
        onSubmit={handleSubmit}
        searchBarType="add"
      />
      <SearchVideosModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        errorMessage={errorMessage}
        videos={videos}
      />
    </Container>
  );
}
