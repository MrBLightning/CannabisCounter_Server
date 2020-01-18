import { Test, TestingModule } from '@nestjs/testing';
import { DataBranchNetworkController } from './data-branch-network.controller';

describe('DataBranchNetwork Controller', () => {
  let controller: DataBranchNetworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataBranchNetworkController],
    }).compile();

    controller = module.get<DataBranchNetworkController>(DataBranchNetworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
