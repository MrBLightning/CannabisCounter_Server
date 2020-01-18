import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialOrderInventoryService } from './data-initial-order-inventory.service';

describe('DataInitialOrderInventoryService', () => {
  let service: DataInitialOrderInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataInitialOrderInventoryService],
    }).compile();

    service = module.get<DataInitialOrderInventoryService>(DataInitialOrderInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
