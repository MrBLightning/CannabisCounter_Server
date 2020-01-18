import { Test, TestingModule } from '@nestjs/testing';
import { ManageSingleSupplierItemController } from './manage-single-supplier-item.controller';

describe('ManageSingleSupplierItem Controller', () => {
  let controller: ManageSingleSupplierItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSingleSupplierItemController],
    }).compile();

    controller = module.get<ManageSingleSupplierItemController>(ManageSingleSupplierItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
