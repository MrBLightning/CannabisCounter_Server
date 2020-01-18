import { Test, TestingModule } from '@nestjs/testing';
import { OrderReserveFishController } from './order-reserve-fish.controller';

describe('OrderReserveFish Controller', () => {
  let controller: OrderReserveFishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderReserveFishController],
    }).compile();

    controller = module.get<OrderReserveFishController>(OrderReserveFishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
