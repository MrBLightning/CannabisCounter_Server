import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialItemTransferService } from './data-initial-item-transfer.service';

describe('DataInitialItemTransferService', () => {
  let service: DataInitialItemTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataInitialItemTransferService],
    }).compile();

    service = module.get<DataInitialItemTransferService>(DataInitialItemTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
