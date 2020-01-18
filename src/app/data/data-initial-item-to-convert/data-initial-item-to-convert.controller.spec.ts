import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialItemToConvertController } from './data-initial-item-to-convert.controller';

describe('DataInitialItemToConvert Controller', () => {
  let controller: DataInitialItemToConvertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataInitialItemToConvertController],
    }).compile();

    controller = module.get<DataInitialItemToConvertController>(DataInitialItemToConvertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
