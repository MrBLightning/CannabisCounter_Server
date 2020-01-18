import { Test, TestingModule } from '@nestjs/testing';
import { OrderInternalOrderService } from './order-internal-order.service';

describe('OrderInternalOrderService', () => {
  let service: OrderInternalOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderInternalOrderService],
    }).compile();

    service = module.get<OrderInternalOrderService>(OrderInternalOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
