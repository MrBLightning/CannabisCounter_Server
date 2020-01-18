import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialItemInventoryService } from './data-initial-item-inventory.service';

describe('DataInitialItemInventoryService', () => {
  let service: DataInitialItemInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataInitialItemInventoryService],
    }).compile();

    service = module.get<DataInitialItemInventoryService>(DataInitialItemInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
