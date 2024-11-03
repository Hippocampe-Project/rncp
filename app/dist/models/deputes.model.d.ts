import { Model } from "sequelize-typescript";
import { Partis } from "./partis.model";
import { Departements } from "./departements.model";
import { CommissionsPermanentes } from "./commissions-p.model";
import { InferAttributes, InferCreationAttributes } from "sequelize";
export declare class Deputes extends Model<InferAttributes<Deputes>, InferCreationAttributes<Deputes>> {
    id: number;
    nom: string;
    dateNaissance: Date;
    departement_id: number;
    departement: Departements;
    circonscription: number;
    commissionPermanente_id: number;
    commissionPermanente: CommissionsPermanentes;
    profession: string;
    suppleant: string;
    parti_id: number;
    parti: Partis;
    photo: Blob;
}
