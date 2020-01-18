import { Test, TestingModule } from '@nestjs/testing';
import { DataMigvanBranchController } from './data-migvan-branch.controller';

describe('DataMigvanBranch Controller', () => {
  let controller: DataMigvanBranchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataMigvanBranchController],
    }).compile();

    controller = module.get<DataMigvanBranchController>(DataMigvanBranchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
