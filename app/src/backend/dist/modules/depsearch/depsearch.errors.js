"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesNotFoundError = exports.DeputeNotFoundError = void 0;
class DeputeNotFoundError extends Error {
    constructor(nom) {
        super(`${nom} was not found`);
        this.code = "Depute_NotFound";
    }
}
exports.DeputeNotFoundError = DeputeNotFoundError;
class VotesNotFoundError extends Error {
    constructor(nom) {
        super(`No votes associated with ${nom} were found`);
        this.code = "Votes_NotFound";
    }
}
exports.VotesNotFoundError = VotesNotFoundError;
//# sourceMappingURL=depsearch.errors.js.map