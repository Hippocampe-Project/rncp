import { Deputes } from "../../models/deputes.model";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Depute } from "src/backend/entities/deputes";
export declare class DepsearchService {
    private deputeModel;
    constructor(deputeModel: typeof Deputes);
    findDepute(deputeId: number): Promise<InferAttributes<Deputes> | null>;
    createDepute(deputeData: InferCreationAttributes<Deputes>): Promise<Depute>;
}
