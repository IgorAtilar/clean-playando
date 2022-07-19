import { Video } from '@/domain/models/video-model';
import { Modal } from '../Modal';
import { SearchVideoDetails } from '../SearchVideoDetails';

import {
  ErrorMessageContainer,
  LoadingContainer,
  ModalCloseButton,
  ModalContainer,
  InfoContentContainer,
  ModalHeader,
  SearchVideoDetailsContainer
} from './styles';

export type SearchVideosModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  videos?: Video[];
  errorMessage?: string;
  onAdd?: (video: Video) => void;
  isLoading?: boolean;
};

export function SearchVideosModal({
  isOpen,
  onClose,
  videos,
  onAdd,
  errorMessage,
  isLoading
}: SearchVideosModalProps) {
  const showError = !videos?.length && !!errorMessage;
  const showVideos = !!videos?.length && !errorMessage && !isLoading;

  return (
    <Modal isOpen={isOpen}>
      <ModalContainer>
        <ModalHeader>
          Resultados
          <ModalCloseButton onClick={onClose}>Fechar</ModalCloseButton>
        </ModalHeader>
        {showVideos && (
          <SearchVideoDetailsContainer>
            {videos.map((video) => (
              <SearchVideoDetails key={video.id} video={video} onAdd={onAdd} />
            ))}
          </SearchVideoDetailsContainer>
        )}
        {!showVideos && (
          <InfoContentContainer>
            {isLoading && <LoadingContainer>Carregando...</LoadingContainer>}
            {showError && <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>}
          </InfoContentContainer>
        )}
      </ModalContainer>
    </Modal>
  );
}
