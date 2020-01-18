import { Test, TestingModule } from '@nestjs/testing';
import { DataGroupController } from './data-group.controller';

describe('DataGroup Controller', () => {
  let controller: DataGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataGroupController],
    }).compile();

    controller = module.get<DataGroupController>(DataGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
