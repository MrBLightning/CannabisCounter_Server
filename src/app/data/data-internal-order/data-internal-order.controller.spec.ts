import { Test, TestingModule } from '@nestjs/testing';
import { DataInternalOrderController } from './data-internal-order.controller';

describe('DataInternalOrder Controller', () => {
  let controller: DataInternalOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataInternalOrderController],
    }).compile();

    controller = module.get<DataInternalOrderController>(DataInternalOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
