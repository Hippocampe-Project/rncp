import { DepsearchService } from "./depsearch.service";
import { Deputes } from "../../models/deputes.model";
export declare class DepsearchResolver {
    private depsearchService;
    constructor(depsearchService: DepsearchService);
    depute(deputeId: number): Promise<import("sequelize").InferAttributes<Deputes, {
        omit: never;
    }>>;
}
