export interface Depute {
  id: number;
  nom: string;
  date_naissance: string;
  sexe: string;
  departement: string;
  circonscription: string;
  commission_permanente: string;
  profession: string;
  suppleant?: string;
  parti: string;
  photo?: string;
  activite: boolean;
  activite_timestamp?: string; // GraphQL will serialize Date as string
}
