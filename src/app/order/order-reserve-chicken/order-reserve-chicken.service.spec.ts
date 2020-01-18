import { Test, TestingModule } from '@nestjs/testing';
import { OrderReserveChickenService } from './order-reserve-chicken.service';

describe('OrderReserveChickenService', () => {
  let service: OrderReserveChickenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderReserveChickenService],
    }).compile();

    service = module.get<OrderReserveChickenService>(OrderReserveChickenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
