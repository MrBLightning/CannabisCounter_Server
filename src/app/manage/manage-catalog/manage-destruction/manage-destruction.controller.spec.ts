import { Test, TestingModule } from '@nestjs/testing';
import { ManageDestructionController } from './manage-destruction.controller';

describe('ManageDestruction Controller', () => {
  let controller: ManageDestructionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageDestructionController],
    }).compile();

    controller = module.get<ManageDestructionController>(ManageDestructionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
