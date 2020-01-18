import { Test, TestingModule } from '@nestjs/testing';
import { ManageDestructionWController } from './manage-destructionW.controller';

describe('ManageDestructionW Controller', () => {
  let controller: ManageDestructionWController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageDestructionWController],
    }).compile();

    controller = module.get<ManageDestructionWController>(ManageDestructionWController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
