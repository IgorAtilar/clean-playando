import { makeFilterPlaylist } from '@/main/usecases/filter-playlist/filter-playlist-factory';
import { makePlaylist } from '@/main/usecases/playlist/playlist-factory';
import { makeRemoveFilterOnPlaylist } from '@/main/usecases/remove-filter-on-playlist/remove-filter-on-playlist-factory';
import { makeRemoveVideo } from '@/main/usecases/remove-video/remove-video-factory';
import { makeSaveVideo } from '@/main/usecases/save-video/save-video-factory';
import { makeSearchVideoByUrl } from '@/main/usecases/search-video-by-url/search-videos-factory';
import { makeSearchVideos } from '@/main/usecases/search-videos/search-videos-factory';
import { Home } from '@/presentation/pages/home';

export function MakeHome() {
  return (
    <Home
      searchVideos={makeSearchVideos()}
      saveVideo={makeSaveVideo()}
      playlist={makePlaylist()}
      removeVideo={makeRemoveVideo()}
      filterPlaylist={makeFilterPlaylist()}
      removeFilterOnPlaylist={makeRemoveFilterOnPlaylist()}
      searchVideoByUrl={makeSearchVideoByUrl()}
    />
  );
}
