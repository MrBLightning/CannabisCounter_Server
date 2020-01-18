import { Test, TestingModule } from '@nestjs/testing';
import { ManagePerukController } from './manage-peruk.controller';

describe('ManagePeruk Controller', () => {
  let controller: ManagePerukController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagePerukController],
    }).compile();

    controller = module.get<ManagePerukController>(ManagePerukController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
