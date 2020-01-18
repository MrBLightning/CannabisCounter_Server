import { Test, TestingModule } from '@nestjs/testing';
import { ManageDordersController } from './manage-dorders.controller';

describe('ManageDorders Controller', () => {
  let controller: ManageDordersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageDordersController],
    }).compile();

    controller = module.get<ManageDordersController>(ManageDordersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
