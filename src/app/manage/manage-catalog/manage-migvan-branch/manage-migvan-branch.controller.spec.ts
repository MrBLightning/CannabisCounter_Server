import { Test, TestingModule } from '@nestjs/testing';
import { ManageMigvanBranchController } from './manage-migvan-branch.controller';

describe('ManageMigvanBranch Controller', () => {
  let controller: ManageMigvanBranchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageMigvanBranchController],
    }).compile();

    controller = module.get<ManageMigvanBranchController>(ManageMigvanBranchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
