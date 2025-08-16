import { ForbiddenError } from "@nestjs/apollo";
import { UnexpectedError } from "../../../errors";

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

export class VotesNotFoundError extends Error {
  readonly code = "Votes_NotFound";

  constructor(nom: string) {
    super(`No votes associated with ${nom} were found`);
  }
}
