export class DomainError extends Error {
  constructor(message: string) {
    super(`[Domain Error] ${message}`);
    this.name = 'DomainError';
  }
}
