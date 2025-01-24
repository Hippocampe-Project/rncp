import { Deputes } from "../../models/deputes.model";
import { InferAttributes } from "sequelize";
export declare class DepsearchService {
    private deputeModel;
    constructor(deputeModel: typeof Deputes);
    findDepute(deputeName: number): Promise<InferAttributes<Deputes> | null>;
}
