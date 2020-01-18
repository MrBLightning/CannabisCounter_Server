import { Test, TestingModule } from '@nestjs/testing';
import { ManageDeconstructionController } from './manage-deconstruction.controller';

describe('ManageDeconstruction Controller', () => {
  let controller: ManageDeconstructionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageDeconstructionController],
    }).compile();

    controller = module.get<ManageDeconstructionController>(ManageDeconstructionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
