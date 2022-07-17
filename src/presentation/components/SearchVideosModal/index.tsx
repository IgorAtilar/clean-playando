import { Video } from '@/domain/models/video-model';
import { Modal } from '../Modal';
import { SearchVideoDetails } from '../SearchVideoDetails';
import {
  ErrorMessageContainer,
  LoadingContainer,
  ModalCloseButton,
  ModalContainer,
  ModalContentContainer,
  ModalHeader
} from './styles';

export type SearchVideosModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  videos?: Video[];
  errorMessage?: string;
};

export function SearchVideosModal({
  isOpen,
  onClose,
  videos,
  errorMessage
}: SearchVideosModalProps) {
  const showLoading = !videos?.length && !errorMessage;
  const showError = !videos?.length && !!errorMessage;
  const showVideos = !!videos?.length && !errorMessage;

  return (
    <Modal isOpen={isOpen}>
      <ModalContainer>
        <ModalHeader>
          Resultados
          <ModalCloseButton onClick={onClose}>Fechar</ModalCloseButton>
        </ModalHeader>
        <ModalContentContainer>
          {showLoading && <LoadingContainer>Carregando...</LoadingContainer>}
          {showError && <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>}
          {showVideos && videos.map((video) => <SearchVideoDetails key={video.id} video={video} />)}
        </ModalContentContainer>
      </ModalContainer>
    </Modal>
  );
}
