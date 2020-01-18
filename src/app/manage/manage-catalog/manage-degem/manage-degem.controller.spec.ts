import { Test, TestingModule } from '@nestjs/testing';
import { ManageDegemController } from './manage-degem.controller';

describe('ManageDegem Controller', () => {
  let controller: ManageDegemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageDegemController],
    }).compile();

    controller = module.get<ManageDegemController>(ManageDegemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
