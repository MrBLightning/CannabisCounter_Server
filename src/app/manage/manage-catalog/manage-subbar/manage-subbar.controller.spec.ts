import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubbarController } from './manage-subbar.controller';

describe('ManageSubbar Controller', () => {
  let controller: ManageSubbarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSubbarController],
    }).compile();

    controller = module.get<ManageSubbarController>(ManageSubbarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
