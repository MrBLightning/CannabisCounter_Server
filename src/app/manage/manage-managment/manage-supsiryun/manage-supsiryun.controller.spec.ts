import { Test, TestingModule } from '@nestjs/testing';
import { ManageSupsiryunController } from './manage-supsiryun.controller';

describe('ManageSupsiryun Controller', () => {
  let controller: ManageSupsiryunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSupsiryunController],
    }).compile();

    controller = module.get<ManageSupsiryunController>(ManageSupsiryunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
