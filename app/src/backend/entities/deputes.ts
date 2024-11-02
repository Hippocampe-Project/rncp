import { Parti } from './partis';

export type Depute = {
  id: number;
  nom: string;
  parti_id: number;
  parti?: Parti;
}