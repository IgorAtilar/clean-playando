import { Video } from '@/domain/models/video-model';
import { mockVideo, mockVideos } from '@/presentation/test/mock-video';
import {
  playlistReducer,
  addToPlaylist,
  PlaylistSliceState,
  removeFromPlaylist,
  filterPlaylist,
  removeFilterFromPlaylist,
  selectPlaylist
} from '.';

describe('Infra: State/Redux/PlaylistSlice', () => {
  it('should return the correct initial state', () => {
    expect(playlistReducer(undefined, { type: undefined })).toEqual({
      videos: [],
      filteredVideos: []
    });
  });

  it('should return the playlist videos correctly when selectPlaylist function is called', () => {
    const videos = mockVideos();
    const state = {
      playlist: {
        videos,
        filteredVideos: videos
      },
      searchCache: {
        searchs: {}
      }
    };
    expect(selectPlaylist(state)).toStrictEqual(videos);
  });

  it('should add a video on playlist when addToPlaylist action is dispatched', () => {
    const firstVideo = mockVideo();
    const secondVideo = mockVideo();

    expect(playlistReducer(undefined, addToPlaylist(firstVideo))).toEqual({
      videos: [firstVideo],
      filteredVideos: [firstVideo]
    });
    const previousState: PlaylistSliceState = {
      videos: [firstVideo],
      filteredVideos: [firstVideo]
    };
    expect(playlistReducer(previousState, addToPlaylist(secondVideo))).toEqual({
      videos: [firstVideo, secondVideo],
      filteredVideos: [firstVideo, secondVideo]
    });
  });

  it('should not add the same video twice on playlist when addToPlaylist action is dispatched', () => {
    const video = mockVideo();
    const previousState: PlaylistSliceState = {
      videos: [video],
      filteredVideos: [video]
    };
    expect(playlistReducer(previousState, addToPlaylist(video))).toStrictEqual({
      videos: [video],
      filteredVideos: [video]
    });
  });

  it('should remove a video on playlist when removeFromPlaylist action is dispatched', () => {
    const video = mockVideo();
    const previousState: PlaylistSliceState = {
      videos: [video],
      filteredVideos: [video]
    };
    expect(playlistReducer(previousState, removeFromPlaylist({ id: video.id }))).toStrictEqual({
      videos: [],
      filteredVideos: []
    });
  });

  it('should remove a video on playlist when removeFromPlaylist action is dispatched', () => {
    const video = mockVideo();
    const previousState: PlaylistSliceState = {
      videos: [video],
      filteredVideos: [video]
    };
    expect(playlistReducer(previousState, removeFromPlaylist({ id: video.id }))).toStrictEqual({
      videos: [],
      filteredVideos: []
    });
  });

  it('should filter the playlist with the pattern correctly when filterPlaylist action is dispatched', () => {
    const firstVideo = mockVideo();
    const secondVideo = mockVideo();
    const thirdVideo: Video = {
      ...mockVideo(),
      title: 'Criando sua primeira promoção'
    };

    const previousState: PlaylistSliceState = {
      videos: [firstVideo, secondVideo, thirdVideo],
      filteredVideos: [firstVideo, secondVideo, thirdVideo]
    };
    expect(
      playlistReducer(previousState, filterPlaylist({ pattern: 'criando promo' }))
    ).toStrictEqual({
      videos: [firstVideo, secondVideo, thirdVideo],
      filteredVideos: [thirdVideo]
    });
  });

  it('should remove the filter on playlist when removeFilterFromPlaylist action is dispatched', () => {
    const firstVideo = mockVideo();
    const secondVideo = mockVideo();
    const thirdVideo = mockVideo();

    const previousState: PlaylistSliceState = {
      videos: [firstVideo, secondVideo, thirdVideo],
      filteredVideos: [thirdVideo]
    };
    expect(playlistReducer(previousState, removeFilterFromPlaylist())).toStrictEqual({
      videos: [firstVideo, secondVideo, thirdVideo],
      filteredVideos: [firstVideo, secondVideo, thirdVideo]
    });
  });
});
