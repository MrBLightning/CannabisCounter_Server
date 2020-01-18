import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubbargeneralController } from './manage-subbargeneral.controller';

describe('ManageSubbargeneral Controller', () => {
  let controller: ManageSubbargeneralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSubbargeneralController],
    }).compile();

    controller = module.get<ManageSubbargeneralController>(ManageSubbargeneralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
