export function makeApiUrl(path: string) {
  return `${process.env.YOUTUBE_API_URL}${path}`;
}
