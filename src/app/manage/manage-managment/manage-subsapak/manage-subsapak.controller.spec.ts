import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubsapakController } from './manage-subsapak.controller';

describe('ManageSubsapak Controller', () => {
  let controller: ManageSubsapakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSubsapakController],
    }).compile();

    controller = module.get<ManageSubsapakController>(ManageSubsapakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
