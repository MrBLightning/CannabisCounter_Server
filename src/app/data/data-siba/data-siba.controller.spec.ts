import { Test, TestingModule } from '@nestjs/testing';
import { DataSibaController } from './data-siba.controller';

describe('DataSiba Controller', () => {
  let controller: DataSibaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSibaController],
    }).compile();

    controller = module.get<DataSibaController>(DataSibaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
