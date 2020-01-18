import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubgroupController } from './manage-subgroup.controller';

describe('ManageSubgroup Controller', () => {
  let controller: ManageSubgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSubgroupController],
    }).compile();

    controller = module.get<ManageSubgroupController>(ManageSubgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
