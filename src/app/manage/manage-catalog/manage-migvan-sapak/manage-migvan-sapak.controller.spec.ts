import { Test, TestingModule } from '@nestjs/testing';
import { ManageMigvanSapakController } from './manage-migvan-sapak.controller';

describe('ManageMigvanSapak Controller', () => {
  let controller: ManageMigvanSapakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageMigvanSapakController],
    }).compile();

    controller = module.get<ManageMigvanSapakController>(ManageMigvanSapakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
