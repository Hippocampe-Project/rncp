import { DepsearchService } from "./depsearch.service";
export declare class DepsearchResolver {
    private depsearchService;
    constructor(depsearchService: DepsearchService);
    depute(deputeName: string): Promise<any>;
}
