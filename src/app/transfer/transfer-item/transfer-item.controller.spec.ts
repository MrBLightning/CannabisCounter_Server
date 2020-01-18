import { Test, TestingModule } from '@nestjs/testing';
import { TransferItemController } from './transfer-item.controller';

describe('TransferItem Controller', () => {
  let controller: TransferItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferItemController],
    }).compile();

    controller = module.get<TransferItemController>(TransferItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
