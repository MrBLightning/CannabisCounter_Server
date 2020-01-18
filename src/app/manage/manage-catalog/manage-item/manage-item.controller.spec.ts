import { Test, TestingModule } from '@nestjs/testing';
import { ManageItemController } from './manage-item.controller';

describe('ManageItem Controller', () => {
  let controller: ManageItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageItemController],
    }).compile();

    controller = module.get<ManageItemController>(ManageItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
