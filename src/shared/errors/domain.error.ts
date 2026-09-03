/**
 * FROZEN CONTRACT - do not modify.
 *
 * Base class for every error the domain is allowed to raise. Domain code
 * throws these; it never throws an HttpException, because the domain does not
 * know it is behind HTTP. Translating a `code` into a status is the job of the
 * single global exception filter.
 */
export abstract class DomainError extends Error {
  public abstract readonly code: string;

  protected constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
