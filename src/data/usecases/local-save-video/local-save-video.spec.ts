import { AddGlobalStateMock } from '@/data/test/mock-global-state';
import { mockVideo } from '@/presentation/test/mock-video';
import { LocalSaveVideo } from './local-save-video';

type SutTypes = {
  sut: LocalSaveVideo;
  addToGlobalStateMock: AddGlobalStateMock;
};

const makeSut = (): SutTypes => {
  const addToGlobalStateMock = new AddGlobalStateMock();
  const sut = new LocalSaveVideo(addToGlobalStateMock);

  return {
    addToGlobalStateMock,
    sut
  };
};

describe('Data: LocalSaveVideo', () => {
  it('should call AddToGlobalState with the correct value', () => {
    const { addToGlobalStateMock: addGlobalStateMock, sut } = makeSut();
    const video = mockVideo();
    sut.save(video);
    expect(addGlobalStateMock.key).toBe('playlist');
    expect(addGlobalStateMock.value).toStrictEqual([video]);
  });
});
