import { Test, TestingModule } from '@nestjs/testing';
import { DataSupSiryunController } from './data-sup-siryun.controller';

describe('DataSupSiryun Controller', () => {
  let controller: DataSupSiryunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSupSiryunController],
    }).compile();

    controller = module.get<DataSupSiryunController>(DataSupSiryunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
