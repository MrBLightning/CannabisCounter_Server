import { Test, TestingModule } from '@nestjs/testing';
import { DataSupSiryunService } from './data-sup-siryun.service';

describe('DataSupSiryunService', () => {
  let service: DataSupSiryunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSupSiryunService],
    }).compile();

    service = module.get<DataSupSiryunService>(DataSupSiryunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
