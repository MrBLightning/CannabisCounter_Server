import { Test, TestingModule } from '@nestjs/testing';
import { DataBranchTypeController } from './data-branch-type.controller';

describe('DataBranchType Controller', () => {
  let controller: DataBranchTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataBranchTypeController],
    }).compile();

    controller = module.get<DataBranchTypeController>(DataBranchTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
