import { Test, TestingModule } from '@nestjs/testing';
import { DataSapakController } from './data-sapak.controller';

describe('DataSapak Controller', () => {
  let controller: DataSapakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSapakController],
    }).compile();

    controller = module.get<DataSapakController>(DataSapakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
