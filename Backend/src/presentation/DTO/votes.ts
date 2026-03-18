export class Vote {
  id!: number;
  titre!: string;
  dossier_legislatif!: string;
  numero_vote!: string;
  date!: string;
  num_votants!: number;
  num_pour!: number;
  num_contre!: number;
  num_abstention!: number;
  non_votants!: string[];
  num_non_votants!: number;
  adopte!: boolean;
  num_absents!: number;
  votants_pour!: string[];
  votants_contre!: string[];
  votants_abstention!: number[];
}
