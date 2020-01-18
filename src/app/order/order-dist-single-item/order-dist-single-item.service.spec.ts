import { Test, TestingModule } from '@nestjs/testing';
import { OrderDistSingleItemService } from './order-dist-single-item.service';

describe('OrderDistSingleItemService', () => {
  let service: OrderDistSingleItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDistSingleItemService],
    }).compile();

    service = module.get<OrderDistSingleItemService>(OrderDistSingleItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
