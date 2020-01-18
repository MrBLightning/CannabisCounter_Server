import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialOrderInventoryController } from './data-initial-order-inventory.controller';

describe('DataInitialOrderInventory Controller', () => {
  let controller: DataInitialOrderInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataInitialOrderInventoryController],
    }).compile();

    controller = module.get<DataInitialOrderInventoryController>(DataInitialOrderInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
