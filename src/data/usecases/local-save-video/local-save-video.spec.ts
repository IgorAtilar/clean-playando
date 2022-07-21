import { GlobalStateMock } from '@/data/test/mock-global-state';
import { PersistentStorageMock } from '@/data/test/mock-persistent-storage';
import { mockVideo } from '@/presentation/test/mock-video';
import { LocalSaveVideo } from './local-save-video';

type SutTypes = {
  sut: LocalSaveVideo;
  globalStateMock: GlobalStateMock;
};

const makeSut = (): SutTypes => {
  const globalStateMock = new GlobalStateMock();
  const persistentStorageMock = new PersistentStorageMock();
  const sut = new LocalSaveVideo(globalStateMock, persistentStorageMock);

  return {
    globalStateMock,
    sut
  };
};

describe('Data: LocalSaveVideo', () => {
  it('should call AddToGlobalState with the correct value', () => {
    const { globalStateMock, sut } = makeSut();
    const video = mockVideo();
    sut.save(video);
    expect(globalStateMock.value).toStrictEqual([video]);
  });
});
