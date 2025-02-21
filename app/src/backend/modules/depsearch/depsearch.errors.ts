import { ForbiddenError } from "apollo-server-express";
import { UnexpectedError } from "errors";

export type DepsearchErrors =
  | ForbiddenError
  | UnexpectedError
  | DeputeNotFoundError;

export class DeputeNotFoundError extends Error {
  readonly code = "Depute_NotFound";

  constructor(nom: string) {
    super(`${nom} was not found`);
  }
}
