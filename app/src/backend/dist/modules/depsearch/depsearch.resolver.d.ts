import { DepsearchService } from "./depsearch.service";
import { VotesDeputesService } from "./votes-deputes.service";
import { Logger } from "@nestjs/common";
import { VoteDeputeDto } from "DTO/votes-deputes";
export type Depsearch = {
    vote_id: number;
    depute_id: number;
    vote_category: string;
    depute_nom: string;
    vote_titre: string;
};
export declare class DepsearchResolver {
    private depsearchService;
    private votesDeputeService;
    constructor(depsearchService: DepsearchService, votesDeputeService: VotesDeputesService);
    logger: typeof Logger;
    depute(deputeName: string): Promise<VoteDeputeDto[]>;
}
