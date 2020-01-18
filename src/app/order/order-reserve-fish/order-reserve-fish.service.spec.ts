import { Test, TestingModule } from '@nestjs/testing';
import { OrderReserveFishService } from './order-reserve-fish.service';

describe('OrderReserveFishService', () => {
  let service: OrderReserveFishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderReserveFishService],
    }).compile();

    service = module.get<OrderReserveFishService>(OrderReserveFishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
