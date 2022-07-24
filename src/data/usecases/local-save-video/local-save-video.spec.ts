import { faker } from '@faker-js/faker';
import { PersistentStorageMock } from '@/data/test/mock-persistent-storage';
import { Video } from '@/domain/models/video-model';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';
import { mockVideo } from '@/presentation/test/mock-video';
import { LocalSaveVideoOnStorage } from '@/data/usecases/local-save-video-on-storage/local-save-video-on-storage';
import { LocalSaveVideo } from './local-save-video';

jest.mock('@/infra/cache/global-state-adapter');
jest.mock('@/data/usecases/local-save-video-on-storage/local-save-video-on-storage');

type SutTypes = {
  sut: LocalSaveVideo;
  globalStateMock: GlobalStateAdapter;
  saveVideoOnStorageMock: LocalSaveVideoOnStorage;
};

const makeSut = (): SutTypes => {
  const globalStateMock = new GlobalStateAdapter();
  const persistentStorageMock = new PersistentStorageMock<Video>();
  const localSaveVideoStorage = new LocalSaveVideoOnStorage(persistentStorageMock);

  const sut = new LocalSaveVideo(globalStateMock, localSaveVideoStorage);

  return {
    globalStateMock,
    sut,
    saveVideoOnStorageMock: localSaveVideoStorage
  };
};

describe('Data: LocalSaveVideo', () => {
  afterEach(() => jest.clearAllMocks());

  it('should call addToPlaylist method from GlobalStateAdapter with the correct value', () => {
    const { globalStateMock, sut } = makeSut();
    const video = mockVideo();
    sut.save(video);

    expect(globalStateMock.addToPlaylist).toHaveBeenCalledWith(video);
  });

  it('should call save method from SaveVideoOnStorage with the correct value', () => {
    const { saveVideoOnStorageMock, sut } = makeSut();
    const video = mockVideo();
    sut.save(video);
    expect(saveVideoOnStorageMock.save).toHaveBeenCalledWith(video);
  });

  it('should return the correct return from addToPlaylist method from GlobalStateAdapter when save method is called', () => {
    const { globalStateMock, sut } = makeSut();
    const video = mockVideo();
    const addToPlayslitResponseMock = {
      success: faker.lorem.words()
    };

    jest.spyOn(globalStateMock, 'addToPlaylist').mockReturnValue(addToPlayslitResponseMock);

    const response = sut.save(video);

    expect(response).toBe(addToPlayslitResponseMock);
  });
});
