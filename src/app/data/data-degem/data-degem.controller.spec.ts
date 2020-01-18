import { Test, TestingModule } from '@nestjs/testing';
import { DataDegemController } from './data-degem.controller';

describe('DataDegem Controller', () => {
  let controller: DataDegemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataDegemController],
    }).compile();

    controller = module.get<DataDegemController>(DataDegemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
