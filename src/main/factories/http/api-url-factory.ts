export function makeApiUrl(path: string) {
  return `${process.env.API_URL}${path}`;
}
