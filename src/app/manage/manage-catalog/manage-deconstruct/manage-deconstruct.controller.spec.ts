import { Test, TestingModule } from '@nestjs/testing';
import { ManageDeconstructController } from './manage-deconstruct.controller';

describe('ManageDeconstruct Controller', () => {
  let controller: ManageDeconstructController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageDeconstructController],
    }).compile();

    controller = module.get<ManageDeconstructController>(ManageDeconstructController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
