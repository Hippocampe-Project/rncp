import { Depute } from './deputes';
export type Vote = {
    id: number;
    depute_id: number;
    scrutin_id: number;
    vote_state: string;
    depute?: Depute;
};
