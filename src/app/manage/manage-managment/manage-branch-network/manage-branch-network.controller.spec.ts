import { Test, TestingModule } from '@nestjs/testing';
import { ManageBranchNetworkController } from './manage-branch-network.controller';

describe('ManageBranchNetwork Controller', () => {
  let controller: ManageBranchNetworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageBranchNetworkController],
    }).compile();

    controller = module.get<ManageBranchNetworkController>(ManageBranchNetworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
