import { makeSearchVideos } from '@/main/usecases/search-videos/search-videos-factory';
import { Home } from '@/presentation/pages/home';

export function MakeHome() {
  return <Home searchVideos={makeSearchVideos()} />;
}
