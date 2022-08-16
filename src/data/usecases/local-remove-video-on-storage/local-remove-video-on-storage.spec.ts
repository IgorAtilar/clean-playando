import { Video } from '@/domain/models/video-model';
import { PersistentStorageMock } from '@/data/test/mock-persistent-storage';
import { LocalRemoveVideoOnStorage } from './local-remove-video-on-storage';
import { PLAYLIST_PERSISTENT_STORAGE_KEY } from '@/services/persistent-storage';
import { mockVideos } from '@/presentation/test/mock-video';

type SutTypes = {
  sut: LocalRemoveVideoOnStorage;
  videos: Video[];
  persistentStorage: PersistentStorageMock<Video>;
};

const makeSut = (): SutTypes => {
  const persistentStorage = new PersistentStorageMock<Video>();
  const mockedVideos = mockVideos();
  persistentStorage.set(PLAYLIST_PERSISTENT_STORAGE_KEY, mockedVideos);
  const sut = new LocalRemoveVideoOnStorage(persistentStorage);

  return {
    videos: mockedVideos,
    sut,
    persistentStorage
  };
};

describe('Data: LocalRemoveVideoOnStorage', () => {
  it('should remove the video with the id passed on remove method', () => {
    const { sut, videos, persistentStorage } = makeSut();
    const videoIdToRemove = videos[videos.length - 1].id;
    sut.remove(videoIdToRemove);
    const updatedVideosOnStorage = persistentStorage.get(PLAYLIST_PERSISTENT_STORAGE_KEY);
    const filteredVideos = videos.filter((video) => video.id !== videoIdToRemove);

    expect(updatedVideosOnStorage).toStrictEqual(filteredVideos);
  });

  it('should do nothing if the id passed is not from any video', () => {
    const { sut, videos, persistentStorage } = makeSut();
    const videoIdToRemove = `${videos[videos.length - 1].id}-test`;
    sut.remove(videoIdToRemove);
    const updatedVideosOnStorage = persistentStorage.get(PLAYLIST_PERSISTENT_STORAGE_KEY);
    expect(updatedVideosOnStorage).toStrictEqual(videos);
  });
});
