import { Test, TestingModule } from '@nestjs/testing';
import { ManageBranchesService } from './manage-branches.service';

describe('ManageBranchesService', () => {
  let service: ManageBranchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageBranchesService],
    }).compile();

    service = module.get<ManageBranchesService>(ManageBranchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
