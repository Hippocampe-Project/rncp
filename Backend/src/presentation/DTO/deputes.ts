export class Depute {
  id!: number;
  nom!: string;
  date_naissance!: string;
  sexe!: string;
  departement_id!: number;
  circonscription!: string;
  commission_permanente_id?: number;
  profession!: string;
  suppleant?: string;
  parti_id!: number;
  photo?: string;
  activite!: boolean;
  activite_timestamp?: Date;
}
