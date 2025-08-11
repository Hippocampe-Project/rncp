import { Test, TestingModule } from "@nestjs/testing";
import { VotesDeputesService } from "./votes-deputes.service";
import { getModelToken } from "@nestjs/sequelize";
import { Votes_deputes } from "../../infrastructure/models/votes-deputes.model";
import { DeputeRepository } from "../../infrastructure/repositories/deputes.repository";
import { VoteRepository } from "../../infrastructure/repositories/votes.repository";
import { DeputeNotFoundError, VotesNotFoundError } from "./depsearch.errors";

// The deputes and vote objects should be able to be simplified by using DTOs instead of the full models instances

describe("VotesDeputesService", () => {
  let service: VotesDeputesService;
  let mockDeputeRepo: Partial<DeputeRepository>;
  let mockVoteRepo: Partial<VoteRepository>;
  let mockVotesDeputesModel: Partial<typeof Votes_deputes>;

  beforeEach(async () => {
    mockDeputeRepo = {
      findDeputeByName: jest.fn(),
    };
    mockVoteRepo = {
      findVotesByDeputeName: jest.fn(),
    };
    mockVotesDeputesModel = {
      bulkCreate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesDeputesService,
        { provide: DeputeRepository, useValue: mockDeputeRepo },
        { provide: VoteRepository, useValue: mockVoteRepo },
        {
          provide: getModelToken(Votes_deputes),
          useValue: mockVotesDeputesModel,
        },
      ],
    }).compile();

    service = module.get<VotesDeputesService>(VotesDeputesService);
  });

  it("should throw DeputeNotFoundError if depute is not found", async () => {
    jest.spyOn(mockDeputeRepo, "findDeputeByName").mockResolvedValue(null);

    await expect(service.createPayload("Fake Depute")).rejects.toThrow(
      DeputeNotFoundError
    );
  });

  it("should throw VotesNotFoundError if no votes are found", async () => {
    jest.spyOn(mockDeputeRepo, "findDeputeByName").mockResolvedValue({
      id: 1,
      nom: "Louis Boyard",
      date_naissance: "2000-01-01",
      sexe: "M",
      departement_id: 75,
      circonscription: "1",
      commission_permanente_id: 3,
      profession: "Étudiant",
      suppleant: null,
      parti_id: 12,
      photo: null,
      activite: true,
      activite_timestamp: new Date(),
    });
    jest.spyOn(mockVoteRepo, "findVotesByDeputeName").mockResolvedValue([]);

    await expect(service.createPayload("Louis Boyard")).rejects.toThrow(
      VotesNotFoundError
    );
  });

  it("should call bulkCreate with correctly mapped payload", async () => {
    const mockDepute = { id: 1 };
    const mockVotes = [
      {
        id: 10,
        titre: "Vote A",
        votants_pour: ["Louis Boyard"],
        votants_contre: [],
        votants_abstention: [],
        non_votants: [],
      },
    ];

    // jest
    //   .spyOn(mockDeputeRepo, "findDeputeByName")
    //   .mockResolvedValue(mockDepute);
    // jest
    //   .spyOn(mockVoteRepo, "findVotesByDeputeName")
    //   .mockResolvedValue(mockVotes);

    await service.createPayload("Louis Boyard");

    expect(mockVotesDeputesModel.bulkCreate).toHaveBeenCalledWith([
      {
        vote_id: 10,
        depute_id: 1,
        vote_category: "pour",
        depute_nom: "louisboyard",
        vote_titre: "Vote A",
      },
    ]);
  });
});
