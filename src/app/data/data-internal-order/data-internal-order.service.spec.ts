import { Test, TestingModule } from '@nestjs/testing';
import { DataInternalOrderService } from './data-internal-order.service';

describe('DataInternalOrderService', () => {
  let service: DataInternalOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataInternalOrderService],
    }).compile();

    service = module.get<DataInternalOrderService>(DataInternalOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
