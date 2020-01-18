import { Test, TestingModule } from '@nestjs/testing';
import { OrderInternalOrderController } from './order-internal-order.controller';

describe('OrderInternalOrder Controller', () => {
  let controller: OrderInternalOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderInternalOrderController],
    }).compile();

    controller = module.get<OrderInternalOrderController>(OrderInternalOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
