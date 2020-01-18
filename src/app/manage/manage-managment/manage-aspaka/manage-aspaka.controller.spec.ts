import { Test, TestingModule } from '@nestjs/testing';
import { ManageAspakaController } from './manage-aspaka.controller';

describe('ManageAspaka Controller', () => {
  let controller: ManageAspakaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageAspakaController],
    }).compile();

    controller = module.get<ManageAspakaController>(ManageAspakaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
