import { Test, TestingModule } from '@nestjs/testing';
import { ManageSiryunController } from './manage-siryun.controller';

describe('ManageSiryun Controller', () => {
  let controller: ManageSiryunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSiryunController],
    }).compile();

    controller = module.get<ManageSiryunController>(ManageSiryunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
