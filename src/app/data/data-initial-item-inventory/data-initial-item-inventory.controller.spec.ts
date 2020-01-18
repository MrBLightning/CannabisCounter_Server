import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialItemInventoryController } from './data-initial-item-inventory.controller';

describe('DataInitialItemInventory Controller', () => {
  let controller: DataInitialItemInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataInitialItemInventoryController],
    }).compile();

    controller = module.get<DataInitialItemInventoryController>(DataInitialItemInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
