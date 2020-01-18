import { Test, TestingModule } from '@nestjs/testing';
import { DataSibaresController } from './data-sibares.controller';

describe('DataSibares Controller', () => {
  let controller: DataSibaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSibaresController],
    }).compile();

    controller = module.get<DataSibaresController>(DataSibaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
