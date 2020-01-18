import { Test, TestingModule } from '@nestjs/testing';
import { ManageUnitSizeController } from './manage-unit-size.controller';

describe('ManageUnitSize Controller', () => {
  let controller: ManageUnitSizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageUnitSizeController],
    }).compile();

    controller = module.get<ManageUnitSizeController>(ManageUnitSizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
