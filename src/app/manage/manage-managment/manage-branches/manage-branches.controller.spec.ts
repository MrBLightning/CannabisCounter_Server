import { Test, TestingModule } from '@nestjs/testing';
import { ManageBranchesController } from './manage-branches.controller';

describe('ManageBranches Controller', () => {
  let controller: ManageBranchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageBranchesController],
    }).compile();

    controller = module.get<ManageBranchesController>(ManageBranchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
