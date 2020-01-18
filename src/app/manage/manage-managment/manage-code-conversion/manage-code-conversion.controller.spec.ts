import { Test, TestingModule } from '@nestjs/testing';
import { ManageCodeConversionController } from './manage-code-conversion.controller';

describe('ManageCodeCoversion Controller', () => {
  let controller: ManageCodeConversionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageCodeConversionController],
    }).compile();

    controller = module.get<ManageCodeConversionController>(ManageCodeConversionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
