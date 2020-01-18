import { Test, TestingModule } from '@nestjs/testing';
import { ManageSiryunService } from './manage-siryun.service';

describe('ManageSiryunService', () => {
  let service: ManageSiryunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSiryunService],
    }).compile();

    service = module.get<ManageSiryunService>(ManageSiryunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
