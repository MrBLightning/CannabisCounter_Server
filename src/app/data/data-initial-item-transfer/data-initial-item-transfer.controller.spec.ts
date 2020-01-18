import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialItemTransferController } from './data-initial-item-transfer.controller';

describe('DataInitialItemTransfer Controller', () => {
  let controller: DataInitialItemTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataInitialItemTransferController],
    }).compile();

    controller = module.get<DataInitialItemTransferController>(DataInitialItemTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
