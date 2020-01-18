import { Test, TestingModule } from '@nestjs/testing';
import { DataBranchController } from './data-branch.controller';

describe('DataBranch Controller', () => {
  let controller: DataBranchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataBranchController],
    }).compile();

    controller = module.get<DataBranchController>(DataBranchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
