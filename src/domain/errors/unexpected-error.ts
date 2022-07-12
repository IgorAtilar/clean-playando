export class UnexpectedError extends Error {
  constructor() {
    super('Oops! Algo de errado aconteceu. Tente novamente mais tarde.');
    this.name = 'UnexpectedError';
  }
}
