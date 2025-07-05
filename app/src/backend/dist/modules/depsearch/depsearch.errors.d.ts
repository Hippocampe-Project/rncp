import { ForbiddenError } from "apollo-server-express";
import { UnexpectedError } from "errors";
export type DepsearchErrors = ForbiddenError | UnexpectedError | DeputeNotFoundError;
export declare class DeputeNotFoundError extends Error {
    readonly code = "Depute_NotFound";
    constructor(nom: string);
}
export declare class VotesNotFoundError extends Error {
    readonly code = "Votes_NotFound";
    constructor(nom: string);
}
