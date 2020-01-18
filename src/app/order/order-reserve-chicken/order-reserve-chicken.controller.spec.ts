import { Test, TestingModule } from '@nestjs/testing';
import { OrderReserveChickenController } from './order-reserve-chicken.controller';

describe('OrderReserveChicken Controller', () => {
  let controller: OrderReserveChickenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderReserveChickenController],
    }).compile();

    controller = module.get<OrderReserveChickenController>(OrderReserveChickenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
