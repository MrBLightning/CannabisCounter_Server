import { Test, TestingModule } from '@nestjs/testing';
import { OrderDistSingleItemController } from './order-dist-single-item.controller';

describe('OrderDistSingleItem Controller', () => {
  let controller: OrderDistSingleItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderDistSingleItemController],
    }).compile();

    controller = module.get<OrderDistSingleItemController>(OrderDistSingleItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
