import { Test, TestingModule } from '@nestjs/testing';
import { ManageConversionController } from './manage-conversion.controller';

describe('ManageConversion Controller', () => {
  let controller: ManageConversionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageConversionController],
    }).compile();

    controller = module.get<ManageConversionController>(ManageConversionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
