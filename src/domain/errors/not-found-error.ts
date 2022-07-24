export class NotFoundError extends Error {
  constructor() {
    super('Oops! Não foi possível encontrar o vídeo pesquisado.');
    this.name = 'NotFoundError';
  }
}
