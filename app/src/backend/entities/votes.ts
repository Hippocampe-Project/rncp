import { Depute } from './deputes';
// import { ScrutinEntity } from './scrutin';

export type Vote = {
  id: number;
  depute_id: number;
  scrutin_id: number;
  vote_state: string;
  depute?: Depute;
 // scrutin?: Scrutin;
}