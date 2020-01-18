import { Test, TestingModule } from '@nestjs/testing';
import { ManageInventoryService } from './manage-inventory.service';

describe('ManageInventoryService', () => {
  let service: ManageInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageInventoryService],
    }).compile();

    service = module.get<ManageInventoryService>(ManageInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
