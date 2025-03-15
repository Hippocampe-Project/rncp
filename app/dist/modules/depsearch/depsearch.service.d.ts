import { VotesDeputesRepository } from "repositories/votes-deputes.repository";
import { Depsearch } from "./depsearch.resolver";
export declare class DepsearchService {
    private votesDeputesRepository;
    constructor(votesDeputesRepository: VotesDeputesRepository);
    retrievePayload(deputeId: number): Promise<Depsearch[]>;
}
