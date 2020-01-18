import { Test, TestingModule } from '@nestjs/testing';
import { DataScrmenuController } from './data-scrmenu.controller';

describe('DataScrmenu Controller', () => {
  let controller: DataScrmenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataScrmenuController],
    }).compile();

    controller = module.get<DataScrmenuController>(DataScrmenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
