import { Test, TestingModule } from '@nestjs/testing';
import { ManageGroupController } from './manage-group.controller';

describe('ManageGroup Controller', () => {
  let controller: ManageGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageGroupController],
    }).compile();

    controller = module.get<ManageGroupController>(ManageGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
