export function makeApiUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}${path}`;
}
