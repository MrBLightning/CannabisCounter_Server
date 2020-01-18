import { Test, TestingModule } from '@nestjs/testing';
import { DataUnitSizeController } from './data-unit-size.controller';

describe('DataUnitSize Controller', () => {
  let controller: DataUnitSizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataUnitSizeController],
    }).compile();

    controller = module.get<DataUnitSizeController>(DataUnitSizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
