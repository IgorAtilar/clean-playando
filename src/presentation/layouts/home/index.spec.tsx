import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/test';
import { HomeLayoutProps, HomeLayout } from '.';
import { mockVideo } from '@/presentation/test/mock-video';

describe('Presentation: Layouts/Home', () => {
  const defaultProps: HomeLayoutProps = {
    filterBarType: 'filter',
    searchBarType: 'search',
    isSearchVideosLoading: false,
    isSearchVideosModalOpen: false,
    onAddVideoToPlaylist: () => {},
    onClearFilter: () => {},
    onCloseSearchVideosModal: () => {},
    onFilter: () => {},
    onRemoveVideoFromPlaylist: () => {},
    onSearch: () => {},
    onSearchBarInputChange: () => {},
    onTogglePlay: () => {},
    currentPlayingVideoId: '',
    playlistVideos: [],
    searchedVideosResult: [],
    searchVideosModalErrorMessage: ''
  };

  it('should render the empty state with the empty playlist text when playlistVideos is empty or not defined and filterBarType is "filter"', () => {
    render(<HomeLayout {...defaultProps} playlistVideos={[]} filterBarType="filter" />);
    const emptyStateText = screen.getByText(
      /Adicione um vídeo na sua playlist e ele aparecerá aqui :D/i
    );
    expect(emptyStateText).toBeInTheDocument();
  });

  it('should render the empty state with the empty filtered playlist text when playlistVideos is empty or not defined and filterBarType is "clear"', () => {
    render(<HomeLayout {...defaultProps} playlistVideos={[]} filterBarType="clear" />);
    const emptyStateText = screen.getByText(/Nenhum vídeo encontrado :\(/i);
    expect(emptyStateText).toBeInTheDocument();
  });

  it('should render the playlist videos when playlistVideos is passed', () => {
    const mockedPlaylistVideos = [mockVideo(), mockVideo()];
    render(<HomeLayout {...defaultProps} playlistVideos={mockedPlaylistVideos} />);
    const firstVideoComponent = screen.getByText(mockedPlaylistVideos[0].title);
    const secondVideoComponent = screen.getByText(mockedPlaylistVideos[0].title);
    expect(firstVideoComponent).toBeInTheDocument();
    expect(secondVideoComponent).toBeInTheDocument();
  });
});
