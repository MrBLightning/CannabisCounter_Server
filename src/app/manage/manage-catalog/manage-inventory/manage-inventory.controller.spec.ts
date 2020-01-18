import { Test, TestingModule } from '@nestjs/testing';
import { ManageInventoryController } from './manage-inventory.controller';

describe('ManageInventory Controller', () => {
  let controller: ManageInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageInventoryController],
    }).compile();

    controller = module.get<ManageInventoryController>(ManageInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
