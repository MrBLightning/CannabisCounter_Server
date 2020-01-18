import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialItemToDestroyController } from './data-initial-item-to-destroy.controller';

describe('DataInitialItemToDestroy Controller', () => {
  let controller: DataInitialItemToDestroyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataInitialItemToDestroyController],
    }).compile();

    controller = module.get<DataInitialItemToDestroyController>(DataInitialItemToDestroyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
