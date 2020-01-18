import { Test, TestingModule } from '@nestjs/testing';
import { DataCountersController } from './data-counters.controller';

describe('DataCounters Controller', () => {
  let controller: DataCountersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataCountersController],
    }).compile();

    controller = module.get<DataCountersController>(DataCountersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
