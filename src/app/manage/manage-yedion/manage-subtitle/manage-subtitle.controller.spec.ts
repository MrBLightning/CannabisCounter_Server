import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubtitleController } from './manage-subtitle.controller';

describe('ManageSubtitleController', () => {
  let controller: ManageSubtitleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSubtitleController],
    }).compile();

    controller = module.get<ManageSubtitleController>(ManageSubtitleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
