import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubSuppliersController } from './manage-subsuppliers.controller';

describe('ManageSubsuppliers Controller', () => {
  let controller: ManageSubSuppliersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSubSuppliersController],
    }).compile();

    controller = module.get<ManageSubSuppliersController>(ManageSubSuppliersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
