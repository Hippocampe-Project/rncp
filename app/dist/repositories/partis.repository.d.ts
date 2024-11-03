import { Partis } from "../models/partis.model";
import { CreatePartiDto } from "../dto/create-parti.dto";
export declare class PartiRepository {
    private readonly partiModel;
    constructor(partiModel: typeof Partis);
    create(createPartiDto: CreatePartiDto): Promise<Partis>;
    findAll(): Promise<Partis[]>;
    findOne(id: number): Promise<Partis>;
    update(id: number, updatePartiDto: any): Promise<[number, Partis[]]>;
    delete(id: number): Promise<void>;
}
