import { Test, TestingModule } from '@nestjs/testing';
import { DataOrderController } from './data-order.controller';

describe('DataOrder Controller', () => {
  let controller: DataOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataOrderController],
    }).compile();

    controller = module.get<DataOrderController>(DataOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
