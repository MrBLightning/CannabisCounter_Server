import { Test, TestingModule } from '@nestjs/testing';
import { DataOrderService } from './data-order.service';

describe('DataOrderService', () => {
  let service: DataOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataOrderService],
    }).compile();

    service = module.get<DataOrderService>(DataOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
