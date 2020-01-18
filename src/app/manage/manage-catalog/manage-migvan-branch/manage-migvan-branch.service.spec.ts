import { Test, TestingModule } from '@nestjs/testing';
import { ManageMigvanBranchService } from './manage-migvan-branch.service';

describe('ManageMigvanBranchService', () => {
  let service: ManageMigvanBranchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageMigvanBranchService],
    }).compile();

    service = module.get<ManageMigvanBranchService>(ManageMigvanBranchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
