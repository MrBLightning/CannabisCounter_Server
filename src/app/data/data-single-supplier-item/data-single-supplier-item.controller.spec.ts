import { Test, TestingModule } from '@nestjs/testing';
import { DataSingleSupplierItemController } from './data-single-supplier-item.controller';

describe('DataSingleSupplierItem Controller', () => {
  let controller: DataSingleSupplierItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSingleSupplierItemController],
    }).compile();

    controller = module.get<DataSingleSupplierItemController>(DataSingleSupplierItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
