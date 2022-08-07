import { Video } from '@/domain/models/video-model';
import CloseIcon from '@/presentation/assets/delete-icon.svg';

import { DeleteButton, Container, ThumbnailImage } from './styles';

export type VideoCardProps = {
  position: string;
  video: Video;
  onPlay: (id: string) => void;
  onRemove: (id: string) => void;
};

export function VideoCard({
  position,
  video: { id, title, channelTitle, publishedAt, thumbnailUrl },
  onPlay,
  onRemove
}: VideoCardProps) {
  return (
    <Container>
      <button title="visualizar" type="button" onClick={() => onPlay(id)}>
        <ThumbnailImage src={thumbnailUrl} alt={`thumbnail do vídeo ${title}`} />
      </button>
      <DeleteButton title="excluir da playlist" onClick={() => onRemove(id)}>
        <CloseIcon aria-label="ícone de excluir" />
      </DeleteButton>
      <h3>
        <span>{position}. </span>
        {title}
      </h3>
      <strong>{channelTitle}</strong>
      <span>{publishedAt}</span>
    </Container>
  );
}
