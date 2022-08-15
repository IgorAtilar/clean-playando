import { faker } from '@faker-js/faker';
import { PersistentStorageMock } from '@/data/test/mock-persistent-storage';
import { Video } from '@/domain/models/video-model';
import { mockVideo } from '@/presentation/test/mock-video';
import { LocalSaveVideoOnStorage } from '@/data/usecases/local-save-video-on-storage/local-save-video-on-storage';
import { LocalSaveVideo } from './local-save-video';

jest.mock('@/data/usecases/local-save-video-on-storage/local-save-video-on-storage');

describe('Data: LocalSaveVideo', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call addToPlaylistGlobalState callback with the correct value', () => {
    const addToPlaylistGlobalState = jest.fn();
    const persistentStorageMock = new PersistentStorageMock<Video>();
    const localSaveVideoStorage = new LocalSaveVideoOnStorage(persistentStorageMock);
    const sut = new LocalSaveVideo(addToPlaylistGlobalState, localSaveVideoStorage);
    const video = mockVideo();
    sut.save(video);
    expect(addToPlaylistGlobalState).toHaveBeenCalledWith(video);
  });

  it('should call save method from SaveVideoOnStorage with the correct value', () => {
    const addToPlaylistGlobalState = jest.fn();
    const persistentStorageMock = new PersistentStorageMock<Video>();
    const localSaveVideoStorage = new LocalSaveVideoOnStorage(persistentStorageMock);
    const sut = new LocalSaveVideo(addToPlaylistGlobalState, localSaveVideoStorage);
    const video = mockVideo();
    sut.save(video);
    expect(localSaveVideoStorage.save).toHaveBeenCalledWith(video);
  });

  it('should return the correct return from addToPlaylist method from GlobalStateAdapter when save method is called', () => {
    const addToPlaylistGlobalState = jest.fn();
    const persistentStorageMock = new PersistentStorageMock<Video>();
    const localSaveVideoStorage = new LocalSaveVideoOnStorage(persistentStorageMock);
    const sut = new LocalSaveVideo(addToPlaylistGlobalState, localSaveVideoStorage);
    const video = mockVideo();
    const addToPlayslitResponseMock = {
      success: faker.lorem.words()
    };

    addToPlaylistGlobalState.mockReturnValue(addToPlayslitResponseMock);

    const response = sut.save(video);

    expect(response).toBe(addToPlayslitResponseMock);
  });
});
