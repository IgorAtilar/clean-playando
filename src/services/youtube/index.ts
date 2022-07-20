const YOUTUBE_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;

export const getVideoIdByVideoUrl = (videoUrl: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
  const match = videoUrl.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  return '';
};

export const isYoutubeVideoUrl = (videoUrl: string): boolean => YOUTUBE_REGEX.test(videoUrl);
