import { GetGlobalStateMock } from '@/data/test/mock-global-state';
import { LOCAL_SAVE_VIDEO_LIST } from '../local-save-video/local-save-video';
import { LocalPlaylist } from './local-playlist';

type SutTypes = {
  sut: LocalPlaylist;
  getGlobalStateMock: GetGlobalStateMock;
};

const makeSut = (): SutTypes => {
  const getGlobalStateMock = new GetGlobalStateMock();
  const sut = new LocalPlaylist(getGlobalStateMock);

  return {
    getGlobalStateMock,
    sut
  };
};

describe('Data: LocalPlaylist', () => {
  it('should call GetGlobalState with the correct key', () => {
    const { getGlobalStateMock, sut } = makeSut();
    sut.get();
    expect(getGlobalStateMock.key).toBe(LOCAL_SAVE_VIDEO_LIST);
  });
});
