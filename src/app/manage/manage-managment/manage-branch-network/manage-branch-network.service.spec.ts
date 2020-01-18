import { Test, TestingModule } from '@nestjs/testing';
import { ManageBranchNetworkService } from './manage-branch-network.service';

describe('ManageBranchNetworkService', () => {
  let service: ManageBranchNetworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageBranchNetworkService],
    }).compile();

    service = module.get<ManageBranchNetworkService>(ManageBranchNetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
