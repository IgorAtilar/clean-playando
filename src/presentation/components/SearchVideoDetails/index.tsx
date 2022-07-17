import { Video } from '@/domain/models/video-model';

export type SearchVideoDetailsProps = {
  video: Video;
  onAdd?: (video: Video) => void;
};

export function SearchVideoDetails({ video, onAdd }: SearchVideoDetailsProps) {
  const { channelTitle, publishedAt, thumbnails, title } = video;
  return (
    <div>
      <div>{title}</div>
      <div>{channelTitle}</div>
      <div>{publishedAt}</div>
      <img
        src={thumbnails.default.url}
        style={{
          width: `${thumbnails.default.width}px`,
          height: `${thumbnails.default.height}px`
        }}
        alt={`thumbnail do vídeo ${title}`}
      />
      <button type="button" onClick={() => onAdd(video)}>
        Adicionar
      </button>
    </div>
  );
}
