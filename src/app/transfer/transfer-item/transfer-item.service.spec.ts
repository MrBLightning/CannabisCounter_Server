import { Test, TestingModule } from '@nestjs/testing';
import { TransferItemService } from './transfer-item.service';

describe('TransferItemService', () => {
  let service: TransferItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferItemService],
    }).compile();

    service = module.get<TransferItemService>(TransferItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
