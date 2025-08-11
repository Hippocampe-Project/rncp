export interface IVotesDeputesService {
  createPayload(deputeName: string): Promise<number>;
}
